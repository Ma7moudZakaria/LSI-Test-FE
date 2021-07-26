import { Component, OnInit } from '@angular/core';
import { TeacherRequestEnum } from 'src/app/core/enums/teacher-subscription-enums/teacher-request-enum.enum';

@Component({
  selector: 'app-teacher-program-request-view',
  templateUrl: './teacher-program-request-view.component.html',
  styleUrls: ['./teacher-program-request-view.component.scss']
})
export class TeacherProgramRequestViewComponent implements OnInit {

  selectedTeatcherRequest:TeacherRequestEnum=TeacherRequestEnum.JoinRequest;

  constructor() { }

  ngOnInit(): void {
  }

  sendTeatcherRequest(teatcherRequestItem:TeacherRequestEnum){
   this.selectedTeatcherRequest=teatcherRequestItem;
  }

}
