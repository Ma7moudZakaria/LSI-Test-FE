import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IExamFormCreatModel } from 'src/app/core/interfaces/exam-form-interfaces/iexam-form-creat-model';
import { IExamFormFilter } from 'src/app/core/interfaces/exam-form-interfaces/iexam-form-filter-request';
import { IExamFormsModel } from 'src/app/core/interfaces/exam-form-interfaces/iexam-forms-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { ExamFormService } from 'src/app/core/services/exam-form-services/exam-form.service';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-exam-view',
  templateUrl: './exam-view.component.html',
  styleUrls: ['./exam-view.component.scss']
})
export class ExamViewComponent implements OnInit {
  filterErrorMessage?:string;
  examFormsList: IExamFormsModel[] = []; 
  examFormFilter: IExamFormFilter = {};
  isView: boolean = true;
   currentForm: FormGroup=new FormGroup({});
   formImport: FormGroup;
@Output() selectedExamFormId= new EventEmitter<{}>();
@Output() inputExamId= new EventEmitter<string>();
resultMessage:BaseMessageModel = {};
langEnum = LanguageEnum;
@Input() addExamForm=false;
  constructor(private examFormService: ExamFormService,public translate: TranslateService,private fb: FormBuilder,public dialog: MatDialog) {
      this.formImport = new FormGroup({
        importFile: new FormControl('', Validators.required)
      });

     }

  ngOnInit(): void {
    this.getExamForms()
    this.buildForm();
    if(this.addExamForm===true){  this.getExamForms();}
  }

  ngOnChanges(changes: any) {
    if(this.addExamForm==true){  this.getExamForms();}
  }
  get f() {
    return this.currentForm?.controls;
  }
  buildForm() {
    this.currentForm = this.fb.group(
      {
        nameAr: ['', Validators.required],
        nameEn: ['', Validators.required],
      })
  }
  getExamForms(name?:string) {
    this.isView=true;
    this.examFormFilter.examFormNam=name || '';
    this.examFormFilter.skip=0;
    this.examFormFilter.take= 2147483647;
    this.resultMessage = {};
    this.examFormService.getExamFormFilter(this.examFormFilter).subscribe(res => {
      let response = <BaseResponseModel>res;
        this.examFormsList = response.data;
          if(this.addExamForm===false)
          {this.loadExams(this.examFormsList[0]?.id,this.examFormsList[0]?.arabExamFormNam,this.examFormsList[0]?.engExamFormNam);
            this.selectedIndex=0;
        }
      
    },
      error => {
        this.resultMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    )
  }
  clearFilter(){
    this.examFormFilter = {};
    this.examFormFilter.skip =0 ;
    this.examFormFilter.take =  100;
    this.getExamForms();
  }
  selectedIndex?:Number;
  loadExams(id?:string,arabExamName?:string,engExamName?:string){
    this.selectedExamFormId.emit({id:id,arabExamName:arabExamName,engExamName:engExamName});
  }
  
  result: string = '';
  confirmDialog(id?:string){
    const message =this.translate.currentLang === LanguageEnum.en ?"Are you sure that you want to delete this exam":"هل متأكد من حذف هذا الإمتحان";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Delete Exam' : 'حذف الإمتحان', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result= dialogResult;
      if(dialogResult==true){
        this.examFormService.deleteExamForm(id||'').subscribe(
          res => {
            res.message;
            
            this.getExamForms();
          }, 
          error => {
            this.resultMessage = {
              message: error,
              type: BaseConstantModel.DANGER_TYPE
            }
          }
        )
      }     
    });
  }

  // selectedIndex?:Number;
  loadExam(id?:string){
    this.inputExamId?.emit(id);
  }
  newExam(){
    this.inputExamId?.emit('');
  }

}
