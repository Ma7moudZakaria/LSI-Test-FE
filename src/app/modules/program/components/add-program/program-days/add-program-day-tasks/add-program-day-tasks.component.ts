import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { ICreateProgramDayTasksModel } from 'src/app/core/interfaces/programs-interfaces/icreate-program-day-tasks-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { ProgramDayTasksService } from 'src/app/core/services/program-day-tasks-services/program-day-tasks.service';

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

  resMessage: BaseMessageModel = {};
  selectedProgramDayTasksList = Array<ICreateProgramDayTasksModel>();
  
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

  onSubmit(value: string) {
    this.resMessage = {}
    if (this.programDayTasksForm.valid) {
      this.createProgramDayTasksModel = [];
      if (this.selectedProgramDayTasksList.length) {
        Array.from(this.selectedProgramDayTasksList).forEach((elm: ICreateProgramDayTasksModel) => {
          this.createProgramDayTasksModel.push({
            programDutyDay: elm.programDutyDay,
            dayTask: elm.dayTask
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
}
