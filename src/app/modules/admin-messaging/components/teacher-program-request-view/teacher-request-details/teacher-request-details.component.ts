import { Component, Input, OnInit } from '@angular/core';
import { TeacherRequestEnum } from 'src/app/core/enums/teacher-subscription-enums/teacher-request-enum.enum';

@Component({
  selector: 'app-teacher-request-details',
  templateUrl: './teacher-request-details.component.html',
  styleUrls: ['./teacher-request-details.component.scss']
})

export class TeacherRequestDetailsComponent implements OnInit {

  @Input()selectedTeatcherRequest :TeacherRequestEnum | undefined;
  teacherRequestEnum=TeacherRequestEnum;

  constructor() { }

  ngOnInit(): void {
  }

}
