import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { QuestionBankQuestionService } from 'src/app/core/services/question-bank-services/question-bank-question.service';
@Component({
  selector: 'app-user-withdrawal-requests',
  templateUrl: './user-withdrawal-requests.component.html',
  styleUrls: ['./user-withdrawal-requests.component.scss']
})
export class UserWithdrawalRequestsComponent implements OnInit {

  constructor(private questionBankQuestionService: QuestionBankQuestionService,
     public translate: TranslateService,public dialog: MatDialog) {
      }

  ngOnInit(): void {
  }

}
