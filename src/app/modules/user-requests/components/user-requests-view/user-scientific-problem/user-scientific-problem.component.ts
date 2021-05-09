import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IScientificProblem } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem';
import { IUserScientificProblemFilter } from 'src/app/core/interfaces/scientific-problrm/iuser-scientific-problem-filter';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
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
  userScientificProfblemModel:IUserScientificProblemFilter = {};
  @Output() openScientificProblem = new EventEmitter<boolean>();

  constructor(
     public translate: TranslateService , 
     public scientificProblemService: ScientificProblemService) {
      }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;

    this.userScientificProfblemModel= {
      usrId : this.currentUser.id, oType: true
    }
    this.getScientificProblemByUserId(this.userScientificProfblemModel);
  }

  getScientificProblemByUserId(model:IUserScientificProblemFilter){
    this.scientificProblemService.getScientificProblem(model).subscribe(res => {      
      if (res.isSuccess) {
        this.scientificProblemData = res.data as IScientificProblem[];    
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

  clearFilter() {
    this.userScientificProfblemModel = {};
    this.userScientificProfblemModel.skip = 0;
    this.userScientificProfblemModel.take = 100;
    this.getScientificProblemByUserId(this.userScientificProfblemModel);
  }

  searchQuestions(text?:string){
    this.scientificProblemData=[];

    this.userScientificProfblemModel= {
      usrId : this.currentUser?.id, oType: true
    };
    this.getScientificProblemByUserId(this.userScientificProfblemModel);
   
  }


  newScientificProblem() {
    this.openScientificProblem.emit(true);
  }
}
