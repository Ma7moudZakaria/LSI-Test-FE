import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IStudentMyProgramsRequestModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-my-programs-request-model';
import { IStudentPrograms } from 'src/app/core/interfaces/student-program-vacation-interfaces/istudent-programs';
import { Iuser } from 'src/app/core/interfaces/user-interfaces/iuser';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
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
  
  constructor(
    private studentProgramSubscriptionService: StudentProgramSubscriptionServicesService,
              public translate : TranslateService,private alertify: AlertifyService,
              private router: Router
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
      }, error => {
        this.alertify.error(error)
      }
    );
  }
  
  goToHomeWore(batchId?:string){
    this.router.navigateByUrl('student-programs/Student-duty/' + this.programFilter.usrId + '/' + batchId);
  }

  closeAddStuDutyDaysToProgramOverlay($event:boolean){
    this.isShowAddStuDutyDaysToProgram=false;
    if($event===true)
   {this.loadPrograms();} 
  }

 startProgram(isDaysRequested?:boolean){
   //IStartStudentBatchRequestModel
   if(isDaysRequested==true)
    {this.isShowAddStuDutyDaysToProgram=true;}
  }

}
