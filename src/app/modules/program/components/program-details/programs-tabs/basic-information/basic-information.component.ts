import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  closeResult = '';
  isShow = false;
  programName:string | undefined;
  
  constructor( 
    public translate: TranslateService, 
    public dialog: MatDialog,  
    private programService: ProgramService,
    private router: Router,
    private modalService: NgbModal,
    private programDayTasksService: ProgramDayTasksService) { }

  ngOnInit(): void {
    this.basicInfoDetails = this.progBasicInfoDetails;
    console.log("progBasicInfoDetails ===========>", this.progBasicInfoDetails);
  }

  copyProgramData(progName?:string){

    if(progName == null || progName == ''){
      this.copyProgram = {
        progId:this.progBasicInfoDetails?.id,
        progName: this.progBasicInfoDetails?.prgName
      }
    }
    else{
      this.copyProgram = {
        progId:this.progBasicInfoDetails?.id,
        progName: progName
      }
    }
    
    

    this.programService.copyProgram(this.copyProgram).subscribe(res => {
      this.isShow = false;
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
  
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
