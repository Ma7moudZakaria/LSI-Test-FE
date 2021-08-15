import { Component, OnInit } from '@angular/core';
import { TeacherRequestEnum } from 'src/app/core/enums/teacher-subscription-enums/teacher-request-enum.enum';

@Component({
  selector: 'app-teacher-requests-view',
  templateUrl: './teacher-requests-view.component.html',
  styleUrls: ['./teacher-requests-view.component.scss']
})
export class TeacherRequestsViewComponent implements OnInit {

  selectedTeatcherRequest:TeacherRequestEnum=TeacherRequestEnum.JoinRequest;

  constructor() { }

  ngOnInit(): void {
  }

  sendTeatcherRequest(teatcherRequestItem:TeacherRequestEnum){
   this.selectedTeatcherRequest=teatcherRequestItem;
  }

}
