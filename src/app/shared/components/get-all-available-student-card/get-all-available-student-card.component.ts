import { Component, Input, OnInit } from '@angular/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IAvailableStudentResponse } from 'src/app/core/interfaces/calls/iavailable-student-response';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-get-all-available-student-card',
  templateUrl: './get-all-available-student-card.component.html',
  styleUrls: ['./get-all-available-student-card.component.scss']
})
export class GetAllAvailableStudentCardComponent implements OnInit {

  // @Output() studentVacationId = new EventEmitter<ITeacherStudentViewModel>();
  langEnum = LanguageEnum;
  starsSelected = 0;
  @Input() availableStudentResponseModel: IAvailableStudentResponse = { totalRows: 0 }

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

}
