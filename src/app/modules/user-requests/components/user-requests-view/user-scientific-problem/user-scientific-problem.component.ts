import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { QuestionBankQuestionService } from 'src/app/core/services/question-bank-services/question-bank-question.service';
@Component({
  selector: 'app-user-scientific-problem',
  templateUrl: './user-scientific-problem.component.html',
  styleUrls: ['./user-scientific-problem.component.scss']
})
export class UserScientificProblemComponent implements OnInit {
  
  constructor(
     public translate: TranslateService) {
      }

  ngOnInit(): void {
    
  }
}
