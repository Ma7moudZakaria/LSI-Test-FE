import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-program-request-view',
  templateUrl: './teacher-program-request-view.component.html',
  styleUrls: ['./teacher-program-request-view.component.scss']
})
export class TeacherProgramRequestViewComponent implements OnInit {

  selectedTeatcherRequest:number=1;

  constructor() { }

  ngOnInit(): void {
  }

  sendTeatcherRequest(teatcherRequestItem:number){
   this.selectedTeatcherRequest=teatcherRequestItem;
  }

}
