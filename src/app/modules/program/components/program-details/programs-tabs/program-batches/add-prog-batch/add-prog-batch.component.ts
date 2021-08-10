import { ThrowStmt } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { error } from 'protractor';
import { ICreateProgBatch } from 'src/app/core/interfaces/program-batches-interfaces/icreate-prog-batch';
import { IProgramDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
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

  @Input() programDetails : IProgramDetails | undefined ;

  currentForm: FormGroup = new FormGroup({});
  isSubmit = false;
  resMessage: BaseMessageModel = {};
  calenderType: BaseSelectedDateModel = new BaseSelectedDateModel();
  createProgBatchModel : ICreateProgBatch | undefined;
  
  constructor(private fb: FormBuilder,
    public translate: TranslateService,
    private ProgramBatchesService: ProgramBatchesService,
    private alertfyService : AlertifyService) { }

  ngOnInit(): void {
    this.buildForm();
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
    this.isSubmit = true;
    this.resMessage = {}
    if (this.currentForm.valid) {
      this.mapCreateModel();

      this.createProgBatchModel ? 
      this.ProgramBatchesService.addProgBatch(this.createProgBatchModel).subscribe(res => {
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

  mapCreateModel(){
    this.createProgBatchModel = {
      arabBatName : this.f.batchNameAr.value,
      engBatName : this.f.batchNameEn.value,
      endDateBatSub : this.f.batchSubscriptionEndDate.value,
      startDateBatSub : this.f.batchSubscriptionStartDate.value,
      progId : this.programDetails?.progBaseInfo?.id
    }
  }

  close(){
    this.hideAddBatchOverlayEvent.emit(false);
  }

  updateStartDate(data : BaseSelectedDateModel){
    data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    this.f.batchSubscriptionStartDate.setValue(data.selectedDateValue);
  }

  updateEndDate(data : BaseSelectedDateModel){
    data.selectedDateValue = data.selectedDateValue.year + '/' + data.selectedDateValue.month + '/' + data.selectedDateValue.day;
    this.f.batchSubscriptionEndDate.setValue(data.selectedDateValue);
  }
}
