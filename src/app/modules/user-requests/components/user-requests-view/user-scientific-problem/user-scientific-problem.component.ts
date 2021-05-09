import { Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IScientificProblem } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem';
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
}
