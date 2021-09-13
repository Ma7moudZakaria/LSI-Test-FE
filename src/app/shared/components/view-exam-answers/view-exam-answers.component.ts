import { Component, Input, OnInit } from '@angular/core';
import { IStuViewExamAnswProgSub } from 'src/app/core/interfaces/student-program-subscription-interfaces/istu-view-exam-answ-prog-sub';
import { IStudentExamAnswerResponseModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-exam-answer-response-model';
import { IStudentSubscriptionFilterRequestModel } from 'src/app/core/interfaces/student-program-subscription-interfaces/istudent-subscription-filter-request-model';

@Component({
  selector: 'app-view-exam-answers',
  templateUrl: './view-exam-answers.component.html',
  styleUrls: ['./view-exam-answers.component.scss']
})
export class ViewExamAnswersComponent implements OnInit {
  @Input() studentExamAnswer: IStuViewExamAnswProgSub | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
