import {Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LanguageEnum} from '../../../core/enums/language-enum.enum';

@Component({
  selector: 'app-admin-drop-out-request-for-teacher-tab-and-student-tab-card',
  templateUrl: './admin-drop-out-request-for-teacher-tab-and-student-tab-card.component.html',
  styleUrls: ['./admin-drop-out-request-for-teacher-tab-and-student-tab-card.component.scss']
})
export class AdminDropOutRequestForTeacherTabAndStudentTabCardComponent implements OnInit {



  langEnum = LanguageEnum;
  requestDate:string | undefined;


  constructor(public translate: TranslateService) { }

  ngOnInit(): void {}







}
