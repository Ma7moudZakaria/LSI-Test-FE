import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, timer } from 'rxjs';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IStartStudentBatchRequestModel } from 'src/app/core/interfaces/student-program-duties-interfaces/istart-student-batch-request-model';
import { IStudentMyProgramsRequestModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-my-programs-request-model';
import { IStudentPrograms } from 'src/app/core/interfaces/student-program-vacation-interfaces/istudent-programs';
import { Iuser } from 'src/app/core/interfaces/user-interfaces/iuser';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { StudentProgDutiesServiceService } from 'src/app/core/services/student-prog-duties-services/student-prog-duties-service.service';
import { StudentProgramSubscriptionServicesService } from 'src/app/core/services/student-program-subscription-services/student-program-subscription-services.service';

@Component({
  selector: 'app-student-programs',
  templateUrl: './student-programs.component.html',
  styleUrls: ['./student-programs.component.scss']
})
export class StudentProgramsComponent implements OnInit {

  programFilter: IStudentMyProgramsRequestModel = { take :2147483647 };
  programs: IStudentPrograms[] | undefined;
  langEnum = LanguageEnum;
  isShowAddStuDutyDaysToProgram:boolean=false;
  day?:number;
  counter: number = 0
  countlength: number = 0;
  countDown: Subscription | undefined;
  counterTimer: number = 5
  tick = 1000;
  startStudentBatchRequest : IStartStudentBatchRequestModel | undefined;

  constructor(
    private studentProgramSubscriptionService: StudentProgramSubscriptionServicesService,
              public translate : TranslateService,private alertify: AlertifyService,
              private router: Router,public studentProgDutiesServiceService:StudentProgDutiesServiceService
  ) { }

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms() {
    this.programFilter.skip = 0;
    this.programFilter.take = 2147483647;
    this.programFilter.usrId =(JSON.parse(localStorage.getItem('user') || '{}') as Iuser).id ;
    this.studentProgramSubscriptionService.getStudentPrograms(this.programFilter).subscribe(
      (res: BaseResponseModel) => {
         this.programs = res.data as IStudentPrograms[] ;
      this.countDown = timer(0, this.tick).subscribe(() => {
        this.programs?.forEach(element => {
         if(element.remainingTimeInNumbers) --element.remainingTimeInNumbers;
    });
        //--this.counterTimer;
        if (this.counterTimer == 0) {
         // this.NextQuestion();
        }
      }
      );
      }, error => {
        this.alertify.error(error)
      }
    );
  }
  
  goToHomeWore(batchId?:string,progId?:string){
    this.router.navigateByUrl('student-programs/Student-duty/' + this.programFilter.usrId + '/' + batchId+'/' + progId);
  }

  closeAddStuDutyDaysToProgramOverlay($event:boolean){
    this.isShowAddStuDutyDaysToProgram=false;
    if($event===true)
   { this.saveStartProgram();}
  }

 startProgram(batchId?:string,progId?:string,noofDutyDays?:number,isDaysRequested?:boolean){
   this.startStudentBatchRequest = {
   batId:batchId,
   studId:(JSON.parse(localStorage.getItem('user') || '{}') as Iuser).id,
   progId:progId,
   dys:[],
   noofDutyDays:noofDutyDays
  }
   if(isDaysRequested==true)
    {this.isShowAddStuDutyDaysToProgram=true;}
    else{

     this.saveStartProgram();
    }
  }

  saveStartProgram(){
    this.studentProgDutiesServiceService.startStudentBatch( this.startStudentBatchRequest || {}).subscribe(
      (res: BaseResponseModel) => {
    if(res.isSuccess){this.alertify.success(res.message || ""); this.loadPrograms();}
    else{this.alertify.error(res.message || "");}
      }, error => {
        this.alertify.error(error)
      }
    );
  }

}
