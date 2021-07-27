import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ProgramConditionViewMoodEnum } from 'src/app/core/enums/programs/program-condition-view-mood-enum.enum';
import { programPredefinedConditionsEnum } from 'src/app/core/enums/programs/program-predefined-conditions-enum.enum';
import { IProgramConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-conditions-model';
import { ICopyProgram } from 'src/app/core/interfaces/programs-interfaces/iprogram-copy-model';
import { IProgramBasicInfoDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { IprogramPredefinedCustomConditionsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-predefined-custom-conditions-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { ProgramConditionsService } from 'src/app/core/services/program-services/program-conditions.service';
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.scss']
})
export class BasicInformationComponent implements OnInit {

  @Output() refreshProgList = new EventEmitter();
  @Output() refreshProgDetails = new EventEmitter();
  @Input() progBasicInfoDetails: IProgramBasicInfoDetails | undefined;
  langEnum = LanguageEnum;
  basicInfoDetails: IProgramBasicInfoDetails | undefined;
  resMessage: BaseMessageModel = {};
  copyProgram = {} as ICopyProgram;
  closeResult = '';
  isShow = false;
  programName: string | undefined;
  prgPubliDate: string | undefined;
  programConditionsPredefinedList: IProgramConditionsModel[] | undefined;
  programConditionsCustomList: IprogramPredefinedCustomConditionsModel[] | undefined;
  errorMessage?: string;
  programConditionsEnum = programPredefinedConditionsEnum;
  programConditionViewMoodEnum = ProgramConditionViewMoodEnum;

  constructor(
    public translate: TranslateService,
    public dialog: MatDialog,
    private programService: ProgramService,
    private router: Router,
    private modalService: NgbModal,
    private alert: AlertifyService,
    public programConditionsService: ProgramConditionsService) { }

  ngOnInit(): void {
    this.basicInfoDetails = this.progBasicInfoDetails;

    let publishDate = new Date(this.basicInfoDetails?.prgPubliDate || '');
    if (!isNaN(publishDate.getTime())) {
      this.prgPubliDate = new Date(publishDate.setDate(publishDate.getDate() + 1)).toISOString().slice(0, 10);
    }

    console.log("progBasicInfoDetails ===========>", this.progBasicInfoDetails);
    this.getProgramConditionsLisByProgId();
  }

  ngOnChanges(changes: any) {
    this.getProgramConditionsLisByProgId();
  }

  copyProgramData(progName?: string) {

    // if(progName == null || progName == ''){
    // this.copyProgram = {
    //   progId:this.progBasicInfoDetails?.id,
    //   progName: this.progBasicInfoDetails?.prgName
    // }
    // }
    // else{
    this.copyProgram = {
      progId: this.progBasicInfoDetails?.id,
      progName: progName
    }
    // }



    this.programService.copyProgram(this.copyProgram).subscribe(res => {
      this.isShow = false;
      this.programName = '';
      if (res.isSuccess) {
        this.alert.success(res.message || '');
        this.refreshProgList.emit();
      }
      else {
        this.alert.error(res.message || '');
      }
    }, error => {
      this.resMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    });
  }

  confirmDialog() {
    const message = this.translate.currentLang === LanguageEnum.en ? "Are you sure that you want to delete this program" : "هل متأكد من حذف هذا البرنامج";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Delete program' : 'حذف برنامج', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.programService.deleteProgram(this.progBasicInfoDetails?.id || '').subscribe(res => {
          if (res.isSuccess) {
            this.alert.success(res.message || '');
            this.refreshProgList.emit();
          }
          else {
            this.alert.error(res.message || '');
            // this.resMessage =
            // {
            //   message: res.message,
            //   type: BaseConstantModel.DANGER_TYPE
            // }
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

  editBasicInfo() {
    this.router.navigate(['/program/edit-program/' + this.progBasicInfoDetails?.id]);
  }

  publishProgram() {
    this.programService.ProgramPublishPause(this.progBasicInfoDetails?.id || '').subscribe(res => {
      if (res.isSuccess) {
        this.alert.success(res.message || '');
        this.refreshProgDetails.emit();
      }
      else {
        this.alert.error(res.message || '');
        // this.resMessage =
        // {
        //   message: res.message,
        //   type: BaseConstantModel.DANGER_TYPE
        // }
      }
    }, error => {
      this.resMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    });
  }

  confirmPuseDialog() {
    const message = this.translate.currentLang === LanguageEnum.en ? "Are you sure that you want to puse this program" : "هل متأكد من وقف هذا البرنامج";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Puse program' : 'وقف برنامج', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.publishProgram()
      }
    });
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

  getProgramConditionsLisByProgId() {
    this.programConditionsService.getProgramConditionsByProgId(this.progBasicInfoDetails?.id || '').subscribe(res => {
      var response = <BaseResponseModel>res;
      if (response.isSuccess) {
        let programConditionsList = res.data as IProgramConditionsModel[];
        this.programConditionsPredefinedList = programConditionsList.filter(x => x.isCustom == false);
        this.programConditionsCustomList = programConditionsList.filter(x => x.isCustom).map(m => ({
          id: m.id,
          title: m.title,
          no: m.no,
          conditionJson: m.progCondValue != "0" ? m.progCondValue : m.conditionContain,
          isRequired: m.condRequired,
          conditionModel: JSON.parse(m.conditionContain || "{}")
        }));
      }
      else {
        this.errorMessage = response.message;
      }
    },
      error => {
        console.log(error);
      });
  }
}
