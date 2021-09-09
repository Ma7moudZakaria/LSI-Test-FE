import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IStartStudentBatchRequestModel, IStudentSelectedDutiesDaysRequestModel } from 'src/app/core/interfaces/student-program-duties-interfaces/istart-student-batch-request-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';

@Component({
  selector: 'app-add-stu-duty-days-to-program',
  templateUrl: './add-stu-duty-days-to-program.component.html',
  styleUrls: ['./add-stu-duty-days-to-program.component.scss']
})
export class AddStuDutyDaysToProgramComponent implements OnInit {
  @Output() closeDayTasks = new EventEmitter<boolean>();
  @Input() startStudentBatchRequest: IStartStudentBatchRequestModel | undefined;
  langEnum = LanguageEnum;
  collectionOfLookup = {} as ILookupCollection;
 // createProgramDayTasksModel = Array<ICreateProgramDayTasksModel>();
  listOfLookups: string[] = ['DAYS'];
  selectedProgramDayTasksList:IStudentSelectedDutiesDaysRequestModel[] = [];
  resultMessage: BaseMessageModel = {};
  daysNumber:number | undefined;

  constructor(
    public languageService: LanguageService,
    public translate: TranslateService,
    private lookupService: LookupService,
    private alertify:AlertifyService
  ) { }

  ngOnInit(): void {
    this.getLookupByKey(); 
    this.daysNumber=this.startStudentBatchRequest?.noofDutyDays;
  }

  getLookupByKey() {
    this.lookupService.getLookupByKey(this.listOfLookups).subscribe(res => {
     
      if (res.isSuccess) {
        this.collectionOfLookup = res.data as ILookupCollection;
      }
      else {
        this.alertify.error(res.message || "")
      }
    }, error => {
      this.alertify.error(error)
    });
  }


  onTaskChange(item : any, event : any){
    if (event.checked){
      this.selectedProgramDayTasksList.push({wekDayId: item.id});
    }
    else{
      let it = this.selectedProgramDayTasksList.filter(i => i.wekDayId === item.id)[0];
      const ind = this.selectedProgramDayTasksList?.indexOf(it);
      if (ind > -1) {
        this.selectedProgramDayTasksList?.splice(ind, 1);
      }
    }
  }



  onSubmit() {
    this.resultMessage = {}
    if( this.selectedProgramDayTasksList.length === this.startStudentBatchRequest?.noofDutyDays ){
      if(this.startStudentBatchRequest?.dys)
      {this.startStudentBatchRequest.dys=this.selectedProgramDayTasksList;}
      this.closeDayTasks.emit(true);
    }
    else{
      this.resultMessage = {
        message: this.translate.currentLang === LanguageEnum.ar ? this.translate.instant('STUDENT_DAY_TASKS.ENTER_DAY') + this.daysNumber : this.translate.instant('STUDENT_DAY_TASKS.ENTER_DAY') + this.daysNumber || "",
        type: BaseConstantModel.DANGER_TYPE
      }
    }
    return;
    // this.closeDayTasks.emit(false);
  }



   closeEvent(event:boolean) {
    this.closeDayTasks.emit(event);
  }

}
