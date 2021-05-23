import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IScientificProblem } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem';
import { IUserScientificProblemFilter } from 'src/app/core/interfaces/scientific-problrm/iuser-scientific-problem-filter';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ScientificProblemService } from 'src/app/core/services/scientific-problem-services/scientific-problem.service';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
@Component({
  selector: 'app-user-scientific-problem',
  templateUrl: './user-scientific-problem.component.html',
  styleUrls: ['./user-scientific-problem.component.scss']
})
export class UserScientificProblemComponent implements OnInit {

  scientificProblemData = {} as IScientificProblem[];
  resMessage: BaseMessageModel = {};
  currentUser: IUser | undefined;
  totalCount = 0;
  userScientificProblemFilterModel: IUserScientificProblemFilter = { skip: 0, take: 0,page : 1 };
  @Output() openScientificProblem = new EventEmitter<boolean>();

  constructor(
     public translate: TranslateService , public dialog: MatDialog,
     public scientificProblemService: ScientificProblemService) {
      }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;

    this.userScientificProblemFilterModel = {
      usrId: this.currentUser.id, oType: true, skip: 0, take: 9, page : 1
    }
    this.getScientificProblemByUserId();
  }

  getScientificProblemByUserId() {
    this.scientificProblemService.getScientificProblem(this.userScientificProblemFilterModel).subscribe(res => {
      if (res.isSuccess) {
        this.scientificProblemData = res.data as IScientificProblem[];
        this.scientificProblemData.forEach(function (item) {
          item.scCreationDate = item.scCreationDate ? new Date(item.scCreationDate).toDateString() : '';
        });
        this.totalCount = res.count ? res.count : 0;

        if ( this.userScientificProblemFilterModel.skip > 0  && (!this.scientificProblemData || this.scientificProblemData.length === 0)){
          this.userScientificProblemFilterModel.page -= 1;
          this.userScientificProblemFilterModel.skip = (this.userScientificProblemFilterModel.page - 1) * this.userScientificProblemFilterModel.take;
          this.getScientificProblemByUserId(); 
        }
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

  searchScProb(text?: string) {
    this.scientificProblemData = [];

    this.userScientificProblemFilterModel.filterText = text;
    this.getScientificProblemByUserId();

  }

  filterRequest(event: IUserScientificProblemFilter) {
    this.userScientificProblemFilterModel = event;
    this.getScientificProblemByUserId();
  }

  newScientificProblem() {
    this.openScientificProblem.emit(true);

  }

  deleteUserScProb(id:string){
    const message =this.translate.currentLang === LanguageEnum.en ?"Are you sure that you want to delete this scientific problem":"هل متأكد من حذف هذا الإشكال العلمى";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Delete Question' : 'حذف سؤال', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult==true){
        this.scientificProblemService.DeleteScientificProblem(id||'').subscribe(
          res => {
            res.message;
            this.getScientificProblemByUserId();
          }, error => {
            this.resMessage ={
              message: error,
              type: BaseConstantModel.DANGER_TYPE
            }
          }
        )
      }     
    });
  }
}
