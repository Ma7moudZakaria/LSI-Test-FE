import { Component, OnInit } from '@angular/core';
import { ScientificProblemUsersEnum } from 'src/app/core/enums/scientific-problem-users-enum.enum';
import { IScientificProblemFilter } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-filter';
import { ITeacherProgramSubscriptionModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-model';
import { ITeacherProgramSubscriptionFilterRequestModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-filter-request-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { TeacherProgramSubscriptionServicesService } from 'src/app/core/services/teacher-program-subscription-services/teacher-program-subscription-services.service';
import { ProgramSubscriptionUsersEnum } from 'src/app/core/enums/program-subscription-users-enum.enum';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';

@Component({
  selector: 'app-teacher-join-program-tab-request',
  templateUrl: './teacher-join-program-tab-request.component.html',
  styleUrls: ['./teacher-join-program-tab-request.component.scss']
})
export class TeacherJionProgramTabRequestComponent implements OnInit {

  teacherProgramSubscriptionList:ITeacherProgramSubscriptionModel[] | undefined;
  teacherProgramSubscriptionFilterRequestModel:ITeacherProgramSubscriptionFilterRequestModel ={skip : 0, take : 12, sortField : '', sortOrder: 1, page : 1};
  errorMessage?: string;
  totalCount = 0;
  teacherCard: ProgramSubscriptionUsersEnum = ProgramSubscriptionUsersEnum.teacher;
  numberItemsPerRow = 4;
  ids?:string[]=[];
  constructor(
    private teacherProgramSubscriptionServicesService: TeacherProgramSubscriptionServicesService,
    private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.getTeachersProgramsSubscriptions();
  }
  searchByText(searchKey: string) {
    this.teacherProgramSubscriptionFilterRequestModel.usrName = searchKey;
    this.getTeachersProgramsSubscriptions();
  }

  getTeachersProgramsSubscriptions() {
    this.teacherProgramSubscriptionServicesService.getTeachersProgramsSubscriptionsFilter(this.teacherProgramSubscriptionFilterRequestModel || {}).subscribe(res => {
      var response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.teacherProgramSubscriptionList = res.data as ITeacherProgramSubscriptionModel[];
        this.totalCount = this.teacherProgramSubscriptionList.length>0 ?this.teacherProgramSubscriptionList[0].totalRows : 0;
      }
      else {
        this.errorMessage = response.message;
      }
    },
      error => {
        console.log(error);
      });
  }

  acceptTeacherProgramSubscription(teacherSubscripModel:ITeacherProgramSubscriptionModel){
    this.ids?.push(teacherSubscripModel.id || '');
    this.teacherProgramSubscriptionServicesService.teacherProgramSubscriptionsAcceptance( this.ids).subscribe(res => {
      var response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.alertify.success(res.message || '');
      }
      else {
        this.alertify.error(res.message || '');
      }
    },
      error => {
        console.log(error);
      });
  }

  acceptAllTeachersCheckedProgramSubscription(){
    
    this.ids= this.teacherProgramSubscriptionList?.filter(i => i.checked).map(a => a.id || '') 
        this.teacherProgramSubscriptionServicesService.teacherProgramSubscriptionsAcceptance( this.ids).subscribe(res => {
          var response = <BaseResponseModel>res;
          if (response.isSuccess) {
            this.alertify.success(res.message || '');
          }
          else {
            this.alertify.error(res.message || '');
          }
        },
          error => {
            console.log(error);
          });
    
  }
  

}
