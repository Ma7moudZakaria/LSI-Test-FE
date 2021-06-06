import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { ICreateProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/icreate-program-day-tasks-model';
import { IProgramDutyDays } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { ProgramDayTasksService } from 'src/app/core/services/program-services/program-day-tasks.service';

@Component({
  selector: 'app-add-program-day-tasks',
  templateUrl: './add-program-day-tasks.component.html',
  styleUrls: ['./add-program-day-tasks.component.scss']
})
export class AddProgramDayTasksComponent implements OnInit {
  programDayTasksForm: FormGroup = new FormGroup({})
  langEnum = LanguageEnum;
  collectionOfLookup = {} as ILookupCollection;
  createProgramDayTasksModel = Array<ICreateProgramDayTasksModel>();
  listOfLookups: string[] = ['Tasks'];

  @Input() programDutyDay = {} as IProgramDutyDays;

  resMessage: BaseMessageModel = {};
  selectedProgramDayTasksList = Array<ICreateProgramDayTasksModel>();
  
  ccc:boolean = false;  

  @Output() closeDayTasks = new EventEmitter<boolean>();
  
  constructor(
    public languageService: LanguageService,
    private programDayTasksService: ProgramDayTasksService,
    public translate: TranslateService,
    private fb: FormBuilder,
    private lookupService: LookupService
    ) { }

  ngOnInit(): void {
    this.setCurrentLang();
    this.getLookupByKey();
    console.log(this.programDutyDay);
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

    }
  }

  onSubmit() {
    this.resMessage = {}
    if (true) {
      this.createProgramDayTasksModel = [];
      if (this.selectedProgramDayTasksList.length) {
        Array.from(this.selectedProgramDayTasksList).forEach((elm: any) => {
          this.createProgramDayTasksModel.push({
            programDutyDay: this.programDutyDay.id,
            dayTask: elm
          });
        });
      }

      this.programDayTasksService.AddProgramDayTasks(this.createProgramDayTasksModel).subscribe(
        res => {
          if (res.isSuccess) {
            this.resMessage = {
              message: res.message,
              type: BaseConstantModel.SUCCESS_TYPE
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
        }
      );
    }
    else {
      this.resMessage = {
        message: this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_MESSAGE'),
        type: BaseConstantModel.DANGER_TYPE
      }
    }
  }

  closeEvent() {
    this.closeDayTasks.emit(false);
  }
}
