import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IExamFormFilter } from 'src/app/core/interfaces/exam-form-interfaces/iexam-form-filter-request';
import { IExamFormsModel } from 'src/app/core/interfaces/exam-form-interfaces/iexam-forms-model';
import { SearchItem } from 'src/app/core/interfaces/role-management-interfaces/role-management';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { ExamFormService } from 'src/app/core/services/exam-form-services/exam-form.service';

@Component({
  selector: 'app-exam-forms-list',
  templateUrl: './exam-forms-list.component.html',
  styleUrls: ['./exam-forms-list.component.scss']
})
export class ExamFormsListComponent implements OnInit {
  filterErrorMessage?:string;
  examFormsList: IExamFormsModel[] = []; 
  examFormsAddedToProgramList: SearchItem[] = []; 
  examFormFilter: IExamFormFilter = {};
  resultMessage:BaseMessageModel = {};
 langEnum = LanguageEnum;
 searchExamFormsList : SearchItem[] | undefined;
 @Output() selectedExamFormId= new EventEmitter<{}>();
  constructor(private examFormService: ExamFormService,public translate: TranslateService) { }

  ngOnInit(): void {
    this.getExamForms();
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
      //  this.loadExams(this.examFormsList[0]?.id,this.examFormsList[0]?.arabExamFormNam,this.examFormsList[0]?.engExamFormNam);
      //     this.selectedIndex=0;
    },
      error => {
        this.resultMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    )
  }

  addUserNotBelongToRole(event: any) {
    this.examFormsAddedToProgramList.push(event);
    console.log(event);
  }

  selectedIndex?:Number;
  loadExams(id?:string,arabExamName?:string,engExamName?:string){
    this.selectedExamFormId.emit({id:id,arabExamName:arabExamName,engExamName:engExamName});
  }

}
