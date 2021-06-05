import { APP_ID, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IProgramBasicInfoModel, IProgramType, IProgRatings, IProgWeeklyDutyDays, IRecitationTimes } from 'src/app/core/interfaces/programs-interfaces/iprogram-basic-info-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ProgramBasicInfoService } from 'src/app/core/services/program-services/program-basic-info.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { IProgramBasicInfoUpdateModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-basic-info-update-model';
import { IProgramBasicInfoDetailsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-basic-info-details-model';
import { ProgramDutiesEnum } from 'src/app/core/enums/programs/program-duties-enum.enum';
import { ProgramDayTaskRecitationType } from 'src/app/core/enums/program-day-task-recitation-type.enum';
import { BaseLookupModel } from 'src/app/core/ng-model/base-lookup-model';
@Component({
  selector: 'app-program-basic-info',
  templateUrl: './program-basic-info.component.html',
  styleUrls: ['./program-basic-info.component.scss']
})
export class ProgramBasicInfoComponent implements OnInit {

  // programTypes = ['برنامج حفظ', 'برنامج قراءة', 'برنامج شرح'];
  // ratingTypes = ['من الطالب للمعلم', 'من المعلم للطالب']
  baseInfoForm: FormGroup = new FormGroup({});
  isSubmit = false;
  baseicInfoProgrmInputs = {} as IProgramBasicInfoModel;
  baseicInfoProgrmDetails : IProgramBasicInfoDetailsModel | undefined;

  resultMessage: BaseMessageModel = {};
  baseicInfoProgrmModel: IProgramBasicInfoModel | undefined;
  baseicInfoProgrmEditModel: IProgramBasicInfoUpdateModel | undefined;

  collectionOfLookup = {} as ILookupCollection;
  listOfLookup: string[] = ['PROG_TYPES', 'SARD_TYPES', 'SHARED_TYPES', 'DUTY_TYPES', 'DAYS','RATING'];

  progDutyDaysFreeDaysSelection:boolean = true;
  isSardEnabled:boolean = false;
  isSardTimesEnabled:boolean = false;

  programTypesList: IProgramType[] = [];
  programRatingList:IProgRatings[] = [];
  progWeeklyDayList:IProgWeeklyDutyDays[] = [];
  progRecitationTimes:IRecitationTimes[] = [];
  recitFrom:string= '';
  recitTo:string = '';


  constructor(private fb: FormBuilder, public translate: TranslateService,
    private BasicInfoService: ProgramBasicInfoService, private lookupService: LookupService,
  ) { }

  ngOnInit(): void {
    this.getLookupByKey();
    this.buildForm();
    if (this.baseicInfoProgrmDetails) {
      this.PopulateForm();
    }
  }


  getLookupByKey() {
    this.lookupService.getLookupByKey(this.listOfLookup).subscribe(res => {
      if (res.isSuccess) {
        this.collectionOfLookup = res.data as ILookupCollection;
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
        durationProg: ['', [Validators.required]],
        dutyTime: ['', [Validators.required]],
        availableDuty: ['', [Validators.required]],
        ideaProg: ['', [Validators.required]],
        goalProg: ['', [Validators.required]],
        visionProg: [''],
        pathProg: ['', [Validators.required]],
        advantageProg: ['', [Validators.required]],
        textPledge: ['', [Validators.required]],
        dutiesDayType: ['', [Validators.required]],
        dayCount:[''],
        examPass: [''],
        rectMand: [''],
        isAlsard: [''],
        recitType:['']

      })
  }
  PopulateForm() {

    this.f.progName.setValue(this.baseicInfoProgrmDetails?.progName);
    this.f.shareWith.setValue(this.baseicInfoProgrmDetails?.shareWith);
    // this.f.progType.setValue(this.baseicInfoProgrmDetails?.progType);
    this.f.durationProg.setValue(this.baseicInfoProgrmDetails?.durationProg);

    this.f.dutyTime.setValue(this.baseicInfoProgrmDetails?.dutyTime);
    this.f.availableDuty.setValue(this.baseicInfoProgrmDetails?.availableDuty);
    this.f.ideaProg.setValue(this.baseicInfoProgrmDetails?.ideaProg);
    this.f.goalProg.setValue(this.baseicInfoProgrmDetails?.goalProg);

    this.f.visionProg.setValue(this.baseicInfoProgrmDetails?.visionProg);
    this.f.pathProg.setValue(this.baseicInfoProgrmDetails?.pathProg);
    this.f.advantageProg.setValue(this.baseicInfoProgrmDetails?.advantageProg);
    this.f.textPledge.setValue(this.baseicInfoProgrmDetails?.textPledge);

    this.f.dutiesDayType.setValue(this.baseicInfoProgrmDetails?.dutiesDayType);
    this.f.dayCount.setValue(this.baseicInfoProgrmDetails?.textPledge);

    this.f.examPass.setValue(this.baseicInfoProgrmDetails?.examPass);
    // this.f.rateProg.setValue(this.baseicInfoProgrmDetails?.rateProg);
    this.f.rectMand.setValue(this.baseicInfoProgrmDetails?.rectMand);
    this.f.isAlsard.setValue(this.baseicInfoProgrmDetails?.isAlsard);
    this.f.recitType.setValue(this.baseicInfoProgrmDetails?.recitType);

  }

  onSubmit() {
    this.isSubmit = true;
    this.resultMessage = {}
    //form is valid
    if (this.baseInfoForm.valid) {

      // 1- fill EDit model 
      if (this.baseicInfoProgrmDetails) {
        this.baseicInfoProgrmEditModel = {
          progId: this.baseicInfoProgrmDetails.progId,
          basicId: this.baseicInfoProgrmDetails.basicId,
          progName: this.baseInfoForm.value.progName,
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
          dutiesDayType: this.baseInfoForm.value.dutiesDayType,
          examPass: this.baseInfoForm.value.examPass,
          rateProg: this.baseInfoForm.value.rateProg,
          rectMand: this.baseInfoForm.value.rectMand,
          isAlsard: this.baseInfoForm.value.isAlsard,

        }
        // send edit model to api 
        this.editBasicInfoProgrm()

      }
      else{
      // 1- fill add model 
      this.baseicInfoProgrmModel = {
        progName: this.baseInfoForm.value.progName,
        progSharedWith: this.baseInfoForm.value.shareWith,
        progTypes: this.programTypesList,
        progDura: this.baseInfoForm.value.durationProg,
        progAvableDtyTime: this.baseInfoForm.value.dutyTime,
        progAllowedDtyDay: this.baseInfoForm.value.availableDuty,
        progIdea: this.baseInfoForm.value.ideaProg,
        progGoal: this.baseInfoForm.value.goalProg,
        progVision: this.baseInfoForm.value.visionProg,
        progMthd: this.baseInfoForm.value.pathProg,
        progAdva: this.baseInfoForm.value.advantageProg,
        progPldgtxt: this.baseInfoForm.value.textPledge,
        progDtyDaytyp:this.baseInfoForm.value.dutiesDayType,
        progCountDtyDay: this.baseInfoForm.value.dayCount,
        progIsPasJinExm: this.baseInfoForm.value.examPass,
        progIsRecTimeMand: this.baseInfoForm.value.rectMand,
        progIsRecitationEna:this.baseInfoForm.value.isAlsard,
        progRecType:this.baseInfoForm.value.recitType,
        proRatTyps:this.programRatingList,
        progDtyDays:this.progWeeklyDayList,
        progRecitTimes:this.progRecitationTimes
      }
      this.addBasicInfoProgrm()
    }

      // 2- send add  model to api 

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


  editBasicInfoProgrm() {
    this.BasicInfoService.updateBasicIfoProgram(this.baseicInfoProgrmEditModel || {}).subscribe(res => {

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

  dutyDaysChange(event:any){
    this.progDutyDaysFreeDaysSelection = this.collectionOfLookup.DUTY_TYPES?.filter(i => i.id === event.value)[0].huffazId === ProgramDutiesEnum.FreeDays;
  }

  isSardChange(event:any){
    this.isSardEnabled = event.value;
  }

  isSardTimesChange(event:any){
    this.isSardTimesEnabled = this.collectionOfLookup.SARD_TYPES?.filter(i => i.id === event.value)[0].huffazId === ProgramDayTaskRecitationType.unlimited;
  }

  addProgTypeToList(item: BaseLookupModel, event:any){
    if (event.checked){
      this.programTypesList?.push({progTypeId:item.id});
    }
    else{
      let it = this.programTypesList.filter(i => i.progTypeId === item.id)[0];
      const ind = this.programTypesList?.indexOf(it);
      if (ind > -1) {
        this.programTypesList?.splice(ind, 1);
      }
    }
    console.log(this.programTypesList);
  }

  addProgRatingToList(item: BaseLookupModel, event:any){
    if (event.checked){
      this.programRatingList?.push({progRatId:item.id});
    }
    else{
      let it = this.programRatingList.filter(i => i.progRatId === item.id)[0];
      const ind = this.programRatingList?.indexOf(it);
      if (ind > -1) {
        this.programRatingList?.splice(ind, 1);
      }
    }
    console.log(this.programRatingList);
  }

  addProgWeeklyDayToList(item: BaseLookupModel, event:any){
    if (event.checked){
      this.progWeeklyDayList?.push({progWeeklyDay:item.id});
    }
    else{
      let it = this.progWeeklyDayList.filter(i => i.progWeeklyDay === item.id)[0];
      const ind = this.progWeeklyDayList?.indexOf(it);
      if (ind > -1) {
        this.progWeeklyDayList?.splice(ind, 1);
      }
    }
    console.log(this.progWeeklyDayList);
  }

  addRecitationTimeToList(){
    var timeExist = this.progRecitationTimes.filter(i => i.progRecFrom === this.recitFrom && i.progRecTo === this.recitTo);
    if (timeExist.length <= 0){
      var start = new Date();
      var end = new Date();

      start.setHours(Number(this.recitFrom.split(':')[0]));
      start.setMinutes(Number(this.recitFrom.split(':')[1]));

      
      end.setHours(Number(this.recitTo.split(':')[0]));
      end.setMinutes(Number(this.recitTo.split(':')[1]));

      if (this.recitFrom && this.recitTo && start < end)
          this.progRecitationTimes.push({progRecFrom:this.recitFrom, progRecTo:this.recitTo});
    }
  }

  removeRecitationTimeToList(item:IRecitationTimes){
    let it = this.progRecitationTimes.filter(i => i.progRecFrom === item.progRecFrom && i.progRecTo === item.progRecTo )[0];
      const ind = this.progRecitationTimes?.indexOf(it);
      if (ind > -1) {
        this.progRecitationTimes?.splice(ind, 1);
      }
  }
}
