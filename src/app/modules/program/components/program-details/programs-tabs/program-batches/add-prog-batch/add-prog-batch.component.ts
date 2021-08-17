import { formatDate } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DateFormatterService } from 'ngx-hijri-gregorian-datepicker';
import { Console } from 'node:console';
import { error } from 'protractor';
import { ICreateProgBatch } from 'src/app/core/interfaces/program-batches-interfaces/icreate-prog-batch';
import { IUpdateProgBatch } from 'src/app/core/interfaces/program-batches-interfaces/iupdate-prog-batch';
import { IProgramBatchesDetails, IProgramDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { BaseSelectedDateModel } from 'src/app/core/ng-model/base-selected-date-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import {ProgramBatchesService} from 'src/app/core/services/program-batches-service/program-batches.service'
 
@Component({
  selector: 'app-add-prog-batch',
  templateUrl: './add-prog-batch.component.html',
  styleUrls: ['./add-prog-batch.component.scss']
})
export class AddProgBatchComponent implements OnInit {

  @Output() hideAddBatchOverlayEvent = new EventEmitter<boolean>();
  @Output() hideEditBatchOverlayEvent = new EventEmitter<boolean>();

  @Input() isEdit : boolean | undefined ;
  @Input() programDetails : IProgramDetails | undefined ;
  @Input() programBatchDetails : IProgramBatchesDetails | undefined ;


  currentForm: FormGroup = new FormGroup({});
  isSubmit = false;
  resMessage: BaseMessageModel = {};
  calenderType: BaseSelectedDateModel = new BaseSelectedDateModel();
  createProgBatchModel : ICreateProgBatch | undefined;
  updateProgBatchModel : IUpdateProgBatch | undefined;
  GetTodayDate:string | undefined;
  minGregorianBatchDate: NgbDateStruct | undefined;
  batchSubscriptionStartDateInputParam: NgbDateStruct = { year: 0, day: 0, month: 0 };
  batchSubscriptionEndDateInputParam: NgbDateStruct = { year: 0, day: 0, month: 0 };
  isMoreToday = false;

  
  constructor(private fb: FormBuilder,
    private dateFormatterService: DateFormatterService,
    public translate: TranslateService,
    private programBatchesService: ProgramBatchesService,
    private alertfyService : AlertifyService) { }

  ngOnInit(): void {
    
    this.buildForm();
    this.setMilady();
    if(this.programBatchDetails != null){
      this.PopulateForm();
    }
  }

  get f() {
    return this.currentForm?.controls;
  }

  buildForm() {
    this.currentForm = this.fb.group(
      {
        batchNameAr: ['', [Validators.required]],
        batchNameEn: ['', [Validators.required]],
        batchSubscriptionStartDate:['',[Validators.required]],
        batchSubscriptionEndDate:['',[Validators.required]]
      })
  }

  submit(){
    this.GetTodayDate = formatDate(new Date(), 'yyyy/MM/dd', 'en') ;
    console.log("GetTodayDate ==========> ", this.GetTodayDate);

    this.isSubmit = true;
    this.resMessage = {}
    if (this.currentForm.valid) {
      this.mapCreateModel();
      var startDate = formatDate((this.createProgBatchModel?.startDateBatSub ? this.createProgBatchModel?.startDateBatSub : ''), 'yyyy/MM/dd', 'en')  ;
      var endDate = formatDate((this.createProgBatchModel?.endDateBatSub ? this.createProgBatchModel?.endDateBatSub : ''), 'yyyy/MM/dd', 'en');

      if( startDate < this.GetTodayDate){
        this.resMessage = {
          message: this.translate.instant('PROGRAM_BATCH.FROM_VALIDATION'),
          type: BaseConstantModel.DANGER_TYPE
        }
        return;
      }

      if( startDate > endDate ){
        this.resMessage = {
          message: this.translate.instant('PROGRAM_BATCH.TO_VALIDATION'),
          type: BaseConstantModel.DANGER_TYPE
        }
        return;
      }


      this.createProgBatchModel ? 
      this.programBatchesService.addProgBatch(this.createProgBatchModel).subscribe(res => {
        if (res.isSuccess){
          this.alertfyService.success(res.message || '');
          this.close();
        }
        else{
          this.resMessage = {
            message : res.message,
            type: BaseConstantModel.DANGER_TYPE
          }
        }
      },error => {

      }) : '';

    }
    else{
      this.resMessage = {
        message: this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_MESSAGE'),
        type: BaseConstantModel.DANGER_TYPE
      }
    }
  }

  update(){
    this.GetTodayDate = formatDate(new Date(), 'yyyy/MM/dd', 'en') ;

    this.isSubmit = true;
    this.resMessage = {}
    if (this.currentForm.valid) {
      this.mapUpdateModel();
      var startDate = formatDate((this.updateProgBatchModel?.startDateBatSub ? this.updateProgBatchModel?.startDateBatSub : ''), 'yyyy/MM/dd', 'en')  ;
      var endDate = formatDate((this.updateProgBatchModel?.endDateBatSub ? this.updateProgBatchModel?.endDateBatSub : ''), 'yyyy/MM/dd', 'en');

      if( startDate < this.GetTodayDate){
        this.resMessage = {
          message: this.translate.instant('PROGRAM_BATCH.FROM_VALIDATION'),
          type: BaseConstantModel.DANGER_TYPE
        }
        return;
      }

      if( startDate > endDate ){
        this.resMessage = {
          message: this.translate.instant('PROGRAM_BATCH.TO_VALIDATION'),
          type: BaseConstantModel.DANGER_TYPE
        }
        return;
      }


      this.updateProgBatchModel ? 
      this.programBatchesService.updateProgBatch(this.updateProgBatchModel).subscribe(res => {
        if (res.isSuccess){
          this.alertfyService.success(res.message || '');
          this.programBatchDetails = {};
          this.close();
        }
        else{
          this.resMessage = {
            message : res.message,
            type: BaseConstantModel.DANGER_TYPE
          }
        }
      },error => {

      }) : '';

    }
    else{
      this.resMessage = {
        message: this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_MESSAGE'),
        type: BaseConstantModel.DANGER_TYPE
      }
    }
  }

  mapCreateModel(){
    this.createProgBatchModel = {
      arabBatName : this.f.batchNameAr.value,
      engBatName : this.f.batchNameEn.value,
      endDateBatSub : this.f.batchSubscriptionEndDate.value,
      startDateBatSub : this.f.batchSubscriptionStartDate.value,
      progId : this.programDetails?.progBaseInfo?.id
    }
  }

  mapUpdateModel(){
    this.updateProgBatchModel = {
      arabBatName : this.f.batchNameAr.value,
      engBatName : this.f.batchNameEn.value,
      endDateBatSub : this.f.batchSubscriptionEndDate.value,
      startDateBatSub : this.f.batchSubscriptionStartDate.value,
      id : this.programBatchDetails?.id
    }
  }

  close(){
    this.hideAddBatchOverlayEvent.emit(false);
    this.hideEditBatchOverlayEvent.emit(false);
  }

  setMilady() {
    let toDayTodayGregorian = this.dateFormatterService.GetTodayGregorian();
    this.minGregorianBatchDate = toDayTodayGregorian;
  }

  updateStartDate(data : BaseSelectedDateModel){
    data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    this.f.batchSubscriptionStartDate.setValue(data.selectedDateValue);
  }

  updateEndDate(data : BaseSelectedDateModel){
    data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    this.f.batchSubscriptionEndDate.setValue(data.selectedDateValue);
  }

  PopulateForm() {
    this.f.batchNameAr.setValue(this.programBatchDetails?.arBatName);
    this.f.batchNameEn.setValue(this.programBatchDetails?.enBatName);

    this.f.batchSubscriptionStartDate.setValue(this.programBatchDetails?.batStaSubsDat);
    let dateOfBatchSubscriptionStart = new Date(this.programBatchDetails?.batStaSubsDat || '');
    this.batchSubscriptionStartDateInputParam = { year: dateOfBatchSubscriptionStart?.getFullYear(), month: dateOfBatchSubscriptionStart?.getMonth() +1, day: dateOfBatchSubscriptionStart?.getDate() };

    this.f.batchSubscriptionEndDate.setValue(this.programBatchDetails?.batEnSubsDat);
    let dateOfBatchSubscriptionEndDateInputParam = new Date(this.programBatchDetails?.batEnSubsDat || '');
    this.batchSubscriptionEndDateInputParam = { year: dateOfBatchSubscriptionEndDateInputParam?.getFullYear(), month: dateOfBatchSubscriptionEndDateInputParam?.getMonth() +1, day: dateOfBatchSubscriptionEndDateInputParam?.getDate() };
  

    let GetToDay =  formatDate(new Date(), 'yyyy/MM/dd', 'en');

    var endDate = formatDate(this.programBatchDetails?.batEnSubsDat || '', 'yyyy/MM/dd', 'en');

    if(GetToDay > endDate){
      this.isMoreToday = true;
      console.log("isMoreToday ========> " , this.isMoreToday)
    }
  }
}
