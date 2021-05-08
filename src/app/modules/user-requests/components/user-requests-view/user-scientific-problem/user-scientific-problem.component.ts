import { Input } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IScientificProblem } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem';
import { IScientificProblemFilter } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-filter';
import { IUserRequestsCategory } from 'src/app/core/interfaces/scientific-problrm/iuser-requests';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { QuestionBankQuestionService } from 'src/app/core/services/question-bank-services/question-bank-question.service';
import { ScientificProblemService } from 'src/app/core/services/scientific-problem-services/scientific-problem.service';
@Component({
  selector: 'app-user-scientific-problem',
  templateUrl: './user-scientific-problem.component.html',
  styleUrls: ['./user-scientific-problem.component.scss']
})
export class UserScientificProblemComponent implements OnInit {

  scientificProblemData = {} as IScientificProblem []; 
  resMessage: BaseMessageModel = {};
  currentUser: IUser | undefined;
  
  @Input() selectedCategoryId = { userRequestNum : "" , nameAr : "" , nameEn : "" };
  @Output() selectedUserScientificProblemId = new EventEmitter<string>();

  @Output() question = new EventEmitter<string>();
  @Output() replay = new EventEmitter<string>();
  @Output() question_number = new EventEmitter<string>();
  @Output() time = new EventEmitter<string>();

  constructor(
     public translate: TranslateService , 
     public scientificProblemService: ScientificProblemService) {
      }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;


    this.getScientificProblemByUserId(this.currentUser.id);
  }

  getScientificProblemByUserId(Id?:string){
    this.scientificProblemService.getScientificProblem(Id || '').subscribe(res => {      
      if (res.isSuccess) {
        this.scientificProblemData = res.data as IScientificProblem[];              
        // this.question?.emit(this.scientificProblemData.question);
        // this.replay?.emit(this.scientificProblemData.reply);
        // this.question_number?.emit(this.scientificProblemData.question);
        // this.time?.emit(this.scientificProblemData.day);
      }
      else {
        this.resMessage = {
        message: res.message,
        type: BaseConstantModel.DANGER_TYPE
        }
      }
    }, error => {
      this.resMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    });
  }

  loadSelectedUserScientificProblem(id?:string){
    this.selectedUserScientificProblemId?.emit(id);
  }

  ngOnChanges(changes: any) {
    let Data = this.selectedCategoryId;

    console.log("selectedUserRequest ===============>" , Data)
  }
}
