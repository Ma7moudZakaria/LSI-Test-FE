import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-day-tasks-model';
import { IProgramDayTasksUpdateOrderByModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-day-tasks-update-order-by-model';
import { IProgramDutyDays } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { IDragDropAccordionItems } from 'src/app/core/interfaces/shared-interfaces/accordion-interfaces/idrag-drop-accordion-items';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { ProgramDayTasksService } from 'src/app/core/services/program-services/program-day-tasks.service';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-program-day-tasks',
  templateUrl: './program-day-tasks.component.html',
  styleUrls: ['./program-day-tasks.component.scss']
})
export class ProgramDayTasksComponent implements OnInit {

  @Output() openAddDayTasks = new EventEmitter<boolean>();
  @Output() programDutyDayModel = new EventEmitter<IProgramDutyDays>();

  @Input() programDutyDay = {} as IProgramDutyDays;

  langEnum = LanguageEnum;
  resMessage: BaseMessageModel = {};
  programDayTasksLists = [] as Array<IProgramDayTasksModel>;
  items1:any;
  programDayTasksUpdateOrderByModel:IProgramDayTasksUpdateOrderByModel={};
  listOrder?: number[];

  constructor(
    public languageService: LanguageService,
    private programDayTasksService: ProgramDayTasksService,
    public translate: TranslateService,
    public dialog: MatDialog, 
    private lookupService: LookupService) { }

  ngOnInit(): void {
    this.getProgramDutyDays(this.programDutyDay?.id);
  }

  setCurrentLang() {
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
    });
  }

  emitHeaderTitle() {
    // this.languageService.headerPageNameEvent.emit(this.translate.instant('UPDATE_TEACHER_PG.TITLE'));
  }

  getProgramDutyDays(id?: string) {
    this.programDayTasksService.getProgramDayTasks(id || '').subscribe(res => {
      if (res.isSuccess) {
        this.programDayTasksLists = res.data as Array<IProgramDayTasksModel>;

        console.log("programDayTasksLists ===========>", this.programDayTasksLists);
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

  newDayTasks() {
    this.openAddDayTasks.emit(true);

  }

  deleteTask(id?: string){
    this.programDayTasksService.DeleteProgramDayTasks(id || '').subscribe(res => {
      if (res.isSuccess) {
        this.programDayTasksLists = res.data as Array<IProgramDayTasksModel>;

        console.log("programDayTasksLists ===========>", this.programDayTasksLists);
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

  copyTask(id?: string){
    this.programDayTasksService.CopyProgramDayTasks(id || '').subscribe(res => {
      if (res.isSuccess) {
        this.programDayTasksLists = res.data as Array<IProgramDayTasksModel>;

        console.log("programDayTasksLists ===========>", this.programDayTasksLists);
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

  confirmDialog(id?:string){
    const message =this.translate.currentLang === LanguageEnum.en ?"Are you sure that you want to delete this task":"هل متأكد من حذف هذه المهمة";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Delete task' : 'حذف المهمة', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult==true){
        this.programDayTasksService.DeleteProgramDayTasks(id || '').subscribe(res => {
          if (res.isSuccess) {
            this.programDayTasksLists = res.data as Array<IProgramDayTasksModel>;
    
            console.log("programDayTasksLists ===========>", this.programDayTasksLists);
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

  drop(event: CdkDragDrop<IDragDropAccordionItems[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.listOrder=[];
      for(let i =0;i<=event.container.data.length-1;i++){
        this.listOrder?.push(event.previousContainer.data[i].order||(i+1));
      }
      this.programDayTasksUpdateOrderByModel.programDutyDay =this.programDutyDay.id;
      this.programDayTasksUpdateOrderByModel.orderList =this.listOrder;
    
      this.programDayTasksService.UpdateOrderByProgramDayTasks(this.programDayTasksUpdateOrderByModel).subscribe(res => {
        if (res.isSuccess) {
       this.getProgramDutyDays(this.programDutyDay.id || '');
        }
        else {
     
        }
        
      },
      error => {
        this.resMessage ={
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      })
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
