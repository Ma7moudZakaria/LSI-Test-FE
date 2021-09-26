import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ProgramDayTasksDetails } from 'src/app/core/enums/programs/program-day-tasks-details.enum';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { ICreateProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/icreate-program-day-tasks-model';
import { IProgramDutyDays } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { ProgramDayTasksService } from 'src/app/core/services/program-services/program-day-tasks.service';

@Component({
  selector: 'app-add-program-day-tasks',
  templateUrl: './add-program-day-tasks.component.html',
  styleUrls: ['./add-program-day-tasks.component.scss']
})
export class AddProgramDayTasksComponent implements OnInit {
  @Output() closeDayTasks = new EventEmitter<boolean>();
  @Input() programDutyDay :IProgramDutyDays | undefined;
  @Input() selectedProgDutyDays:IProgramDutyDays[] = [];
  @Input() haveMemorize?:boolean=false;
  langEnum = LanguageEnum;
  detailsTypeEnum = ProgramDayTasksDetails;
  programDayTasksForm: FormGroup = new FormGroup({})
  collectionOfLookup = {} as ILookupCollection;
  createProgramDayTasksModel = Array<ICreateProgramDayTasksModel>();
  listOfLookups: string[] = ['Tasks'];
  resMessage: BaseMessageModel = {};
  selectedProgramDayTasksList = Array<ICreateProgramDayTasksModel>();
  ccc:boolean = false;  
  checked:boolean=false;

  constructor(
    public languageService: LanguageService,
    private programDayTasksService: ProgramDayTasksService,
    public translate: TranslateService,
    private fb: FormBuilder,
    private lookupService: LookupService,
    private aletify:AlertifyService
    ) { }

  ngOnInit(): void {
    this.setCurrentLang();
    this.getLookupByKey();
  }

  setCurrentLang() {
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
      this.buildForm();
    });
  }

  emitHeaderTitle() {
    // this.languageService.headerPageNameEvent.emit(this.translate.instant('UPDATE_TEACHER_PG.TITLE'));
  }

  getLookupByKey() {
    this.lookupService.getLookupByKey(this.listOfLookups).subscribe(res => {
      this.collectionOfLookup = res.data as ILookupCollection;
      if (res.isSuccess) {
      }
      else {
        this.resMessage =
        {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    });
  }

  get f() {
    return this.programDayTasksForm.controls;
  }

  buildForm() {
    this.programDayTasksForm = this.fb.group({
      dayTasks: [],
    })
  }

  onTaskChange(item : any, event : any){
   if (event.checked){
      this.selectedProgramDayTasksList.push(item.id);
    }
    else{
      let it = this.selectedProgramDayTasksList.filter(i => i === item.id)[0];
      const ind = this.selectedProgramDayTasksList?.indexOf(it);
      if (ind > -1) {
        this.selectedProgramDayTasksList?.splice(ind, 1);
      }
    }
// if(this.haveMemorize==false){
//     this.haveMemorize = this.selectedProgramDayTasksList.some(i => i === '5c2a09dc-7873-450f-af1d-4d153765e5c1');//'5c2a09dc-7873-450f-af1d-4d153765e5c1' is id memorize task
//   if(!this.haveMemorize&& this.selectedProgramDayTasksList.some(i => i === '8ed9715f-d5d4-403d-8edd-714799a33060')){// 8ed9715f-d5d4-403d-8edd-714799a33060 is id tasmea task
//     let it = this.selectedProgramDayTasksList.filter(i => i === '8ed9715f-d5d4-403d-8edd-714799a33060')[0];
//     const ind = this.selectedProgramDayTasksList?.indexOf(it);
//     if (ind > -1) {
//       this.selectedProgramDayTasksList?.splice(ind, 1);
//     }
//     this.checked=false;
//   }}
  }

  async onSubmit() {

    if (this.selectedProgDutyDays.length === 0 && this.programDutyDay) {
      this.createProgramDayTasksModel = [];
      if (this.selectedProgramDayTasksList.length) {
        Array.from(this.selectedProgramDayTasksList).forEach((elm: any) => {
          this.createProgramDayTasksModel.push({
            programDutyDay: this.programDutyDay?.id,
            dayTask: elm
          });
        });
      }
      await this.addProgDayTaskApiCall();
    }
    else if(this.selectedProgDutyDays.length > 0 && !this.programDutyDay || 
      (this.selectedProgDutyDays.length > 0 && this.programDutyDay && this.selectedProgDutyDays.includes(this.programDutyDay))) {
        this.selectedProgDutyDays.forEach(async element => {
          this.createProgramDayTasksModel = [];
          Array.from(this.selectedProgramDayTasksList).forEach((elm: any) => {
            this.createProgramDayTasksModel.push({
              programDutyDay: element.id,
              dayTask: elm
            });
          });
          await this.addProgDayTaskApiCall();
        });
      // this.resMessage = {
      //   message: this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_MESSAGE'),
      //   type: BaseConstantModel.DANGER_TYPE
      // }
    }
    else{
      this.aletify.error('please select day or check multi days');
    }
  }

  async addProgDayTaskApiCall(){
    this.programDayTasksService.AddProgramDayTasks(this.createProgramDayTasksModel).subscribe(
      res => {
        if (res.isSuccess) {
          this.resMessage = {
            message: res.message,
            type: BaseConstantModel.SUCCESS_TYPE
          }
          this.closeEvent();
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
      }
    );
  }

  closeEvent() {
    this.closeDayTasks.emit(false);
  }
}
