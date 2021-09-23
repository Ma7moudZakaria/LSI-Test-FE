import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IGroupExplanationsStudentViewResponse } from 'src/app/core/interfaces/calls/igroup-explanations-student-view-response';

@Component({
  selector: 'app-student-group-cards',
  templateUrl: './student-group-cards.component.html',
  styleUrls: ['./student-group-cards.component.scss']
})
export class StudentGroupCardsComponent implements OnInit {
  @Input() item: IGroupExplanationsStudentViewResponse | undefined;
  langEnum = LanguageEnum;

  constructor(public translate: TranslateService) { }


  ngOnInit(): void {
  }

}
