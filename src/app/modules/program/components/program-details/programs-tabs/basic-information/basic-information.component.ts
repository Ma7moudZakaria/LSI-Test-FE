import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ICopyProgram } from 'src/app/core/interfaces/programs-interfaces/iprogram-copy-model';
import { IProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-day-tasks-model';
import { IProgramBasicInfoDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ProgramDayTasksService } from 'src/app/core/services/program-services/program-day-tasks.service';
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.scss']
})
export class BasicInformationComponent implements OnInit {

  @Input() progBasicInfoDetails:IProgramBasicInfoDetails | undefined;
  langEnum = LanguageEnum;
  basicInfoDetails:IProgramBasicInfoDetails | undefined;
  resMessage: BaseMessageModel = {};
  copyProgram = {} as ICopyProgram;
  
  constructor( 
    public translate: TranslateService, 
    public dialog: MatDialog,  
    private programService: ProgramService,
    private router: Router,
    private programDayTasksService: ProgramDayTasksService) { }

  ngOnInit(): void {
    this.basicInfoDetails = this.progBasicInfoDetails;
    console.log("progBasicInfoDetails ===========>", this.progBasicInfoDetails);
  }

  copyProgramData(){

    this.copyProgram = {
      progId:this.progBasicInfoDetails?.id,
      progName: this.progBasicInfoDetails?.prgName
    }

    this.programService.copyProgram(this.copyProgram).subscribe(res => {
      if (res.isSuccess) {

      }
      else {
        this.resMessage =
        {
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

  confirmDialog(){
    const message =this.translate.currentLang === LanguageEnum.en ?"Are you sure that you want to delete this task":"هل متأكد من حذف هذه المهمة";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Delete task' : 'حذف المهمة', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult==true){
        this.programService.deleteProgram(this.progBasicInfoDetails?.id || '').subscribe(res => {
          if (res.isSuccess) {
            
          }
          else {
            this.resMessage =
            {
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
    });
  }

  editBasicInfo(){
    this.router.navigate(['/program/edit-program/' + this.progBasicInfoDetails?.id]);
  }

  publishProgram(){
    console.log("id ===========>", this.basicInfoDetails?.id);
    this.programService.ProgramPublishPause(this.progBasicInfoDetails?.id || '').subscribe(res => {
      if (res.isSuccess) {

      }
      else {
        this.resMessage =
        {
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
