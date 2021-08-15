import { APP_ID, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IProgramBasicInfoModel, IProgramType, IProgRatings, IProgWeeklyDutyDays, IRecitationTimes } from 'src/app/core/interfaces/programs-interfaces/iprogram-basic-info-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ProgramBasicInfoService } from 'src/app/core/services/program-services/program-basic-info.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { ProgramCategoriesService } from 'src/app/core/services/program-categories-services/program-categories.service';
import { IProgramBasicInfoUpdateModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-basic-info-update-model';
import { ProgramDutiesEnum } from 'src/app/core/enums/programs/program-duties-enum.enum';
import { ProgramDayTaskRecitationType } from 'src/app/core/enums/program-day-task-recitation-type.enum';
import { BaseLookupModel } from 'src/app/core/ng-model/base-lookup-model';
import { Router } from '@angular/router';
import { IProgramBasicInfoDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { ThrowStmt } from '@angular/compiler';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
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
  @Input() progBasicInfoDetails : IProgramBasicInfoDetails | undefined;

  resultMessage: BaseMessageModel = {};
  baseicInfoProgrmModel: IProgramBasicInfoModel | undefined;
  baseicInfoProgrmEditModel: IProgramBasicInfoUpdateModel | undefined;

  collectionOfLookup = {} as ILookupCollection;
  listOfLookup: string[] = ['PROG_TYPES', 'SARD_TYPES', 'SHARED_TYPES', 'DUTY_TYPES', 'DAYS','RATING'];

  progDutyDaysFreeDaysSelection:boolean = true;
  isSardEnabled:boolean = false;
  isSardTimesEnabled:boolean = false;
  langEnum = LanguageEnum;
  allPrograms = [];
  programTypesList: IProgramType[] = [];
  programRatingList:IProgRatings[] = [];
  progWeeklyDayList:IProgWeeklyDutyDays[] = [];
  progRecitationTimes:IRecitationTimes[] = [];
  recitFrom:string= '';
  recitTo:string = '';


  constructor(private fb: FormBuilder, 
    public translate: TranslateService,
    private BasicInfoService: ProgramBasicInfoService, 
    private lookupService: LookupService,
    private router: Router,
    private alert : AlertifyService,
    private ProgramCategoriesService :ProgramCategoriesService
  ) { }

  ngOnInit(): void {
    this.getLookupByKey();
    this.buildForm();
  }

  getAllCategories(){
    this.ProgramCategoriesService.getProgramCatiegories().subscribe(res => {
      if (res.isSuccess) {}
  })};

  removeItemFromSelectedTeacherRewayats(item: any) {
    // let index = this.selectedRewayatsList.indexOf(item);
    // this.selectedRewayatsList.splice(index, 1);
  }
  getLookupByKey() {
    this.lookupService.getLookupByKey(this.listOfLookup).subscribe(res => {
      if (res.isSuccess) {
        this.collectionOfLookup = res.data as ILookupCollection;
        
        //set default value for duty days lookups
        this.f.dutiesDayType.setValue(this.collectionOfLookup?.DUTY_TYPES ? this.collectionOfLookup?.DUTY_TYPES[0]?.id:'');

        if (this.progBasicInfoDetails) {
          this.PopulateForm();
        }
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
        progName: ['', [Validators.required, Validators.maxLength(100)]],
        shareWith: ['', [Validators.required]],
        durationProg: ['', [Validators.required]],
        dutyTime: ['', [Validators.required]],
        availableDuty: ['', [Validators.required]],
        ideaProg: ['', [Validators.required , Validators.maxLength(300)]],
        goalProg: ['', [Validators.required, Validators.maxLength(300)]],
        visionProg: ['', [Validators.maxLength(300)]],
        pathProg: ['', [Validators.required, Validators.maxLength(300)]],
        advantageProg: ['', [Validators.required, Validators.maxLength(300)]],
        textPledge: ['', [Validators.required, Validators.maxLength(300)]],
        dutiesDayType: ['', [Validators.required]],
        dayCount:['1' , [Validators.required,Validators.max(7)]], 
        examPass: [''],
        rectMand: [''],
        isAlsard: [false],
        recitType:[''],
        //progType:[[] /*, [Validators.required]*/]

      })
  }
  PopulateForm() {

    this.f.progName.setValue(this.progBasicInfoDetails?.prgName);
    this.f.shareWith.setValue(this.progBasicInfoDetails?.prgSharType);
    this.f.durationProg.setValue(this.progBasicInfoDetails?.prgDura);

    this.f.dutyTime.setValue(this.progBasicInfoDetails?.prgAvailaDutyTime);
    this.f.availableDuty.setValue(this.progBasicInfoDetails?.prgAllowDutyDays);
    this.f.ideaProg.setValue(this.progBasicInfoDetails?.prgIda);
    this.f.goalProg.setValue(this.progBasicInfoDetails?.prgGoal);

    this.f.visionProg.setValue(this.progBasicInfoDetails?.prgVisi);
    this.f.pathProg.setValue(this.progBasicInfoDetails?.prgMeth);
    this.f.advantageProg.setValue(this.progBasicInfoDetails?.prgAdvan);
    this.f.textPledge.setValue(this.progBasicInfoDetails?.prgPledgTxt);

    this.f.dutiesDayType.setValue(this.progBasicInfoDetails?.prgDutiDayType);
    this.dutyDaysChange({value:this.progBasicInfoDetails?.prgDutiDayType});
    this.f.dayCount.setValue(this.progBasicInfoDetails?.prgNoDutyDays);

    this.f.examPass.setValue(this.progBasicInfoDetails?.prgIsPassExaRequ);
    this.f.rectMand.setValue(this.progBasicInfoDetails?.prgIsRecitTimeMand);
    this.f.isAlsard.setValue(this.progBasicInfoDetails?.prgIsSard);
    this.isSardChange({value:this.progBasicInfoDetails?.prgIsSard});
    this.f.recitType.setValue(this.progBasicInfoDetails?.prgRecitType);
    this.isSardTimesChange({value:this.progBasicInfoDetails?.prgRecitType});

    this.progRecitationTimes = this.progBasicInfoDetails?.prgRecitTms ? 
    this.progBasicInfoDetails?.prgRecitTms.filter(i=>i.huffno !== ProgramDayTaskRecitationType.limited).map((item: any) => ({ progRecFrom:item.recitFrom, progRecTo:item.recitTo })) : [];

    this.programTypesList = this.progBasicInfoDetails?.prgTps ?
    this.progBasicInfoDetails?.prgTps.map((item: any) => ({ progTypeId: item.id })) : [];

    this.progWeeklyDayList = this.progBasicInfoDetails?.prgWeekDutiDas ? 
    this.progBasicInfoDetails?.prgWeekDutiDas.map((item:any) => ({progWeeklyDay: item.id})) : [] ;

    this.programRatingList = this.progBasicInfoDetails?.prgRats ? 
    this.progBasicInfoDetails?.prgRats.map((item:any) => ({progRatId: item.id})) : [] ;

  }

  onSubmit() {
    this.isSubmit = true;
    this.resultMessage = {}

    if (!this.progDutyDaysFreeDaysSelection && this.progWeeklyDayList.length === 0){
      return;
    }
    //form is valid
    if (this.baseInfoForm.valid && this.programTypesList.length > 0) {

      // 1- fill EDit model 
      if (this.progBasicInfoDetails) {
        this.baseicInfoProgrmEditModel = {
          progId: this.progBasicInfoDetails?.id,
          progSharedWith: this.baseInfoForm.value.shareWith,
          progAvableDtyTime: this.baseInfoForm.value.dutyTime,
          progAllowedDtyDay: this.baseInfoForm.value.availableDuty,
          progIdea: this.baseInfoForm.value.ideaProg,
          progGoal: this.baseInfoForm.value.goalProg,
          progVision: this.baseInfoForm.value.visionProg,
          progMthd: this.baseInfoForm.value.pathProg,
          progAdva: this.baseInfoForm.value.advantageProg,
          progPldgtxt: this.baseInfoForm.value.textPledge,
          progIsPasJinExm: this.baseInfoForm.value.examPass,
          progIsRecTimeMand: this.baseInfoForm.value.rectMand,
          progRecType:this.baseInfoForm.value.recitType,
          proRatTyps:this.programRatingList,
          progRecitTimes:this.progRecitationTimes
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
        this.router.navigate(['/program/edit-program/' + res.data]);
      }
      else {
        this.alert.error(res.message || '');
      }
    }, error => {
      this.alert.error(error || '');
    });
  }

  editBasicInfoProgrm() {
    this.BasicInfoService.updateBasicIfoProgram(this.baseicInfoProgrmEditModel || {}).subscribe(res => {

      if (res.isSuccess) {
        this.alert.success(res.message || '');
      }
      else {
        this.alert.error(res.message || '');
      }
    }, error => {
      this.alert.error(error || '');
    });
  }

  onCancel(){
    this.router.navigate(["/program"]);
  }

  dutyDaysChange(event:any){
    this.progDutyDaysFreeDaysSelection = this.collectionOfLookup.DUTY_TYPES?.filter(i => i.id === event.value)[0]?.huffazId === ProgramDutiesEnum.FreeDays;
  }

  isSardChange(event:any){
    this.isSardEnabled = event.value;
  }

  isSardTimesChange(event:any){
    this.isSardTimesEnabled = this.collectionOfLookup.SARD_TYPES?.filter(i => i.id === event.value)[0]?.huffazId === ProgramDayTaskRecitationType.unlimited;
    if(!this.isSardTimesEnabled){
      this.progRecitationTimes = [];
    }
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

  progTypeChecked(item:BaseLookupModel){
    return this.programTypesList.some(it => it.progTypeId === item.id);
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

  progProgRatingChecked(item:BaseLookupModel){
    return this.programRatingList.some(it => it.progRatId === item.id);
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
  }

  progWeeklyDaysChecked(item:BaseLookupModel){
    return this.progWeeklyDayList.some(it => it.progWeeklyDay === item.id);
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
