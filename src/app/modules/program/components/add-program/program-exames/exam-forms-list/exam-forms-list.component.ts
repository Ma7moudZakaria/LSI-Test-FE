import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IExamFormFilter } from 'src/app/core/interfaces/exam-form-interfaces/iexam-form-filter-request';
import { IExamFormsModel } from 'src/app/core/interfaces/exam-form-interfaces/iexam-forms-model';
import { IAssignExamFormsToProgram } from 'src/app/core/interfaces/programs-interfaces/iassign-exam-forms-to-program';
import { IProgramBasicInfoDetails, IProgramDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { SearchItem } from 'src/app/core/interfaces/role-management-interfaces/role-management';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { ExamFormService } from 'src/app/core/services/exam-form-services/exam-form.service';
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { ProgramDetailsComponent } from '../../../program-details/program-details.component';

@Component({
  selector: 'app-exam-forms-list',
  templateUrl: './exam-forms-list.component.html',
  styleUrls: ['./exam-forms-list.component.scss']
})
export class ExamFormsListComponent implements OnInit {
  
  @Output() selectedExamFormId= new EventEmitter<string>();
  
  @Input() progDetails : IProgramDetails | undefined;

  examFormsList: IExamFormsModel[] = []; 
  examFormsAddedToProgramList: SearchItem[] = []; 
  examFormFilter: IExamFormFilter = {};
  resultMessage:BaseMessageModel = {};
  assignExamFormsToProgramModel:IAssignExamFormsToProgram ={};
  langEnum = LanguageEnum;
  searchExamFormsList : SearchItem[] | undefined;
  toggel : boolean | undefined;
  selectedIndex?:Number;

//  @Input() selectedprogram={programId:'',isContainExam:'true'};
 
  constructor(private examFormService: ExamFormService,
    private programService:ProgramService,
    public translate: TranslateService,
    private _alertify:AlertifyService) { }

  ngOnInit(): void {
    this.getExamForms();

    if (this.progDetails?.progJoiExa && this.progDetails?.progJoiExa.length > 0){
      this.mapProgExams();
      this.toggel = this.progDetails.progBaseInfo?.prgIsConExa;
    }
  }

  mapProgExams(){
   this.examFormsAddedToProgramList = this.progDetails?.progJoiExa ? this.progDetails?.progJoiExa?.map(item => ({
    usrId:item.id || '',
    arUsrName :item.arExaName || '',
    enUsrName:item.enExaName || '',
    createdOn:'',
    usrAvatarUrl:'',
    usrEmail:''
   })) :[];
  }

  getExamForms(name?:string) {
    this.examFormFilter.examFormNam=name || '';
    this.examFormFilter.skip=0;
    this.examFormFilter.take= 2147483647;
    this.resultMessage = {};
    this.examFormService.getExamFormFilter(this.examFormFilter).subscribe(res => {
      let response = <BaseResponseModel>res;
        this.examFormsList = response.data;

        this.searchExamFormsList= this.examFormsList.map(item => ({
          usrId:item.id || '',
          arUsrName :item.arabExamFormNam || '',
          enUsrName:item.arabExamFormNam || '',
          createdOn:'',
          usrAvatarUrl:'',
          usrEmail:''
         
        }))
        this.loadExams(this.examFormsAddedToProgramList[0]?.usrId,this.examFormsAddedToProgramList[0]?.arUsrName,this.examFormsAddedToProgramList[0]?.enUsrName);
          this.selectedIndex=0;
    },
      error => {
        this.resultMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    )
  }

  addExamItem(event: any) {
    this.examFormsAddedToProgramList.push(event);
  //  if(this.examFormsAddedToProgramList.length==1) {
    this.loadExams(this.examFormsAddedToProgramList[0]?.usrId,this.examFormsAddedToProgramList[0]?.arUsrName,this.examFormsAddedToProgramList[0]?.enUsrName);
    this.selectedIndex=0;
  //  }
   
  }

  deleteFromExamFormsAddedToProgramList(item:SearchItem) {
    const index = this.examFormsAddedToProgramList.indexOf(item);
    this.examFormsAddedToProgramList.splice(index,1);
    this.searchExamFormsList?.push(item);
      this.loadExams(this.examFormsAddedToProgramList[0]?.usrId,this.examFormsAddedToProgramList[0]?.arUsrName,this.examFormsAddedToProgramList[0]?.enUsrName);
      this.selectedIndex=0;
  }

  loadExams(id?:string,arabExamName?:string,engExamName?:string){
    // this.selectedExamFormId.emit({id:id,arabExamName:arabExamName,engExamName:engExamName});
    this.selectedExamFormId.emit(id);
  }

  onCheckboxChange(){

    this.progDetails!.progBaseInfo!.prgIsConExa = !this.progDetails?.progBaseInfo?.prgIsConExa;

    if (!this.progDetails?.progBaseInfo?.prgIsConExa){
      this.loadExams('');
      this.examFormsAddedToProgramList = [];
      this.getExamForms();
    }

    this.programService.updateProgramExamToggle(this.progDetails?.progBaseInfo?.id || '').subscribe(res => {
      if (res.isSuccess) {
        this.resultMessage = {
          message:res.message||"",
          type: BaseConstantModel.SUCCESS_TYPE
        }
        setTimeout(() => {
          this.resultMessage = {
            message:"",
            type:""
          }
        }, 1500)
      }
      else {
        this.resultMessage = {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
        setTimeout(() => {
          this.resultMessage = {
            message:"",
            type:""
          }
        }, 1500)
      }
      
    },
      error => {
        this.resultMessage = {
          message: this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_MESSAGE'),
          type: BaseConstantModel.DANGER_TYPE
        }
        setTimeout(() => {
          this.resultMessage = {
            message:"",
            type:""
          }
        }, 1500)
      })

  }

  async assignExamFormToProgram() {
    this.resultMessage = {};
    // this.assignExamFormsToProgramModel.programId=this.selectedprogram.programId;
    this.assignExamFormsToProgramModel.programId=this.progDetails?.progBaseInfo?.id;
    this.assignExamFormsToProgramModel.examForms=this.examFormsAddedToProgramList.map(item => ({ examFormId:item.usrId || ''}));
        this.programService.assignExamFormToProgram(this.assignExamFormsToProgramModel).subscribe(res => {
          if (res.isSuccess) {
            
            this._alertify.success(res.message||"");
        
          }
          else {
            this.resultMessage = {
              message: res.message,
              type: BaseConstantModel.DANGER_TYPE
            }
          }
        },
          error => {
            this.resultMessage = {
              message: error,
              type: BaseConstantModel.DANGER_TYPE
            }
          })

  }

}
