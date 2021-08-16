import { Component, Input, OnInit } from '@angular/core';
import { TeacherRequestEnum } from 'src/app/core/enums/teacher-subscription-enums/teacher-request-enum.enum';

@Component({
  selector: 'app-teacher-requests-view-details',
  templateUrl: './teacher-requests-view-details.component.html',
  styleUrls: ['./teacher-requests-view-details.component.scss']
})
export class TeacherRequestsViewDetailsComponent implements OnInit {

  @Input()selectedTeatcherRequest :TeacherRequestEnum | undefined;
  teacherRequestEnum=TeacherRequestEnum;

  constructor() { }

  ngOnInit(): void {
  }

}
