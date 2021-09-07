import { Component, OnInit } from '@angular/core';
import {LanguageEnum} from '../../../core/enums/language-enum.enum';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-admin-join-request-for-teacher-tab-and-student-tab-card',
  templateUrl: './admin-join-request-for-teacher-tab-and-student-tab-card.component.html',
  styleUrls: ['./admin-join-request-for-teacher-tab-and-student-tab-card.component.scss']
})
export class AdminJoinRequestForTeacherTabAndStudentTabCardComponent implements OnInit {


  langEnum = LanguageEnum;
  requestDate:string | undefined;


  constructor(public translate: TranslateService) { }

  ngOnInit(): void {}



}
