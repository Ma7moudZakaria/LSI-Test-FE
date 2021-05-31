import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IProgramBasicInfoModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-basic-info-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ProgramBasicInfoService } from 'src/app/core/services/program-services/program-basic-info.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
@Component({
  selector: 'app-program-basic-info',
  templateUrl: './program-basic-info.component.html',
  styleUrls: ['./program-basic-info.component.scss']
})
export class ProgramBasicInfoComponent implements OnInit {

  programType = ['برنامج حفظ', 'برنامج قراءة', 'برنامج شرح'];
  days = [' سبت', 'الاحد ', 'الاتنين'];
  rate = ['من الطالب للمعلم', 'من المعلم للطالب']
  baseInfoForm: FormGroup = new FormGroup({});
  isSubmit = false;
  baseicInfoProgrmInputs = {} as IProgramBasicInfoModel;
  resultMessage: BaseMessageModel = {};
  baseicInfoProgrmModel: IProgramBasicInfoModel | undefined;

  collectionOfLookup = {} as ILookupCollection;
  listOfLookup: string[] = ['PROG_TYPES', 'SARD_TYPES', 'SHARED_TYPES', 'DUTY_TYPES', 'DAYS'];


  constructor(private fb: FormBuilder, public translate: TranslateService,
    private BasicInfoService: ProgramBasicInfoService, private lookupService: LookupService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getLookupByKey()

  }


  getLookupByKey() {
    this.lookupService.getLookupByKey(this.listOfLookup).subscribe(res => {
      this.collectionOfLookup = res.data as ILookupCollection;
      if (res.isSuccess) {

      }
      else {
        this.resultMessage =
        {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    });
  }
  get f() {
    return this.baseInfoForm.controls;

  }

  buildForm() {
    this.baseInfoForm = this.fb.group(
      {
        progName: ['', [Validators.required]],
        shareWith: ['', [Validators.required]],
        progType: ['', [Validators.required]],
        durationProg: ['', [Validators.required]],
        dutyTime: ['', [Validators.required]],
        availableDuty: ['', [Validators.required]],
        ideaProg: ['', [Validators.required]],
        goalProg: ['', [Validators.required]],
        visionProg: [''],
        pathProg: ['', [Validators.required]],
        advantageProg: ['', [Validators.required]],
        textPledge: ['', [Validators.required]],
        dutiesDays: ['', [Validators.required]],
        numberOfDays: [''],
        specificDays: [''],
        examPass: [''],
        rateProg: [''],
        recitationDates: [''],
        isAlsard: [''],
        recitationPeriod: [''],
        fromTime: [''],
        toTime: [''],

      })
  }

  onSubmit() {
    this.isSubmit = true;
    this.resultMessage = {}
    //form is valid
    if (this.baseInfoForm.valid) {

      // 1- fill add model 
      this.baseicInfoProgrmModel = {
        progName: this.baseInfoForm.value.baseInfoForm,
        shareWith: this.baseInfoForm.value.shareWith,
        progType: this.baseInfoForm.value.progType,
        durationProg: this.baseInfoForm.value.durationProg,
        dutyTime: this.baseInfoForm.value.dutyTime,
        availableDuty: this.baseInfoForm.value.availableDuty,
        ideaProg: this.baseInfoForm.value.ideaProg,
        goalProg: this.baseInfoForm.value.goalProg,
        visionProg: this.baseInfoForm.value.visionProg,
        pathProg: this.baseInfoForm.value.pathProg,
        advantageProg: this.baseInfoForm.value.advantageProg,
        textPledge: this.baseInfoForm.value.textPledge,
        dutiesDays: this.baseInfoForm.value.dutiesDays,
        numberOfDays: this.baseInfoForm.value.numberOfDays,
        specificDays: this.baseInfoForm.value.specificDays,
        examPass: this.baseInfoForm.value.examPass,
        rateProg: this.baseInfoForm.value.rateProg,
        recitationDates: this.baseInfoForm.value.recitationDates,
        isAlsard: this.baseInfoForm.value.isAlsard,
        recitationPeriod: this.baseInfoForm.value.recitationPeriod,
        fromTime: this.baseInfoForm.value.fromTime,
        toTime: this.baseInfoForm.value.toTime

      }

      // 2- send add  model to api 
      this.addBasicInfoProgrm()

    }

    // form is invalid
    else {
      this.resultMessage = {
        message: this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_MESSAGE'),
        type: BaseConstantModel.DANGER_TYPE
      }
    } //close else if in case form not invalid

  }





  addBasicInfoProgrm() {
    this.BasicInfoService.addBasicIfoProgram(this.baseicInfoProgrmModel || {}).subscribe(res => {

      if (res.isSuccess) {
        this.resultMessage = {
          message: res.message || "",
          type: BaseConstantModel.SUCCESS_TYPE
        }

      }
      else {
        this.resultMessage = {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    }, error => {
      this.resultMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    });


  }



}
