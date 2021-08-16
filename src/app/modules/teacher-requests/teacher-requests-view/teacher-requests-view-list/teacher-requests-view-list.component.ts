import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TeacherRequestEnum } from 'src/app/core/enums/teacher-subscription-enums/teacher-request-enum.enum';

@Component({
  selector: 'app-teacher-requests-view-list',
  templateUrl: './teacher-requests-view-list.component.html',
  styleUrls: ['./teacher-requests-view-list.component.scss']
})
export class TeacherRequestsViewListComponent implements OnInit {

  @Output() selectedTeatcherRequest = new EventEmitter<number>();
  teacherRequestEnum = TeacherRequestEnum;
  selectedIndex: TeacherRequestEnum = TeacherRequestEnum.JoinRequest;

  constructor() { }


  ngOnInit(): void {
  }

  teatcherRequestSelected(requestNum: TeacherRequestEnum) {
    this.selectedTeatcherRequest.emit(requestNum);
  }

}
