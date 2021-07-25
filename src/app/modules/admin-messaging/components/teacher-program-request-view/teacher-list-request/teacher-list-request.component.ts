import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TeacherRequestEnum } from 'src/app/core/enums/teacher-subscription-enums/teacher-request-enum.enum';

@Component({
  selector: 'app-teacher-list-request',
  templateUrl: './teacher-list-request.component.html',
  styleUrls: ['./teacher-list-request.component.scss']
})
export class TeacherListRequestComponent implements OnInit {

  @Output() selectedTeatcherRequest = new EventEmitter<number>();
  teacherRequestEnum = TeacherRequestEnum;
  selectedIndex: TeacherRequestEnum = TeacherRequestEnum.JoinRequest;

  constructor() { }


  ngOnInit(): void {
  }

  teatcherRequestSelected(requestNum: number) {
    this.selectedTeatcherRequest.emit(requestNum);
  }
}
