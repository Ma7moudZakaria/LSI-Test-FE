import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IProgramExamFormsDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';

@Component({
  selector: 'app-join-requests',
  templateUrl: './join-requests.component.html',
  styleUrls: ['./join-requests.component.scss']
})
export class JoinRequestsComponent implements OnInit {

  @Input() programExamFormsDetails: Array<IProgramExamFormsDetails> | undefined;
  langEnum = LanguageEnum;

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

}
