import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ITeacherProgramSubscriptionModel } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iteacher-program-subscription-model';

@Component({
  selector: 'app-teacher-card-request',
  templateUrl: './teacher-card-request.component.html',
  styleUrls: ['./teacher-card-request.component.scss']
})
export class TeacherCardRequestComponent implements OnInit {

 @Input() teacherSubscripModel: ITeacherProgramSubscriptionModel = {totalRows:0}
  constructor() { }

  ngOnInit(): void {
  }

}
