import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { error } from 'protractor';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ICreateProgBatch } from 'src/app/core/interfaces/program-batches-interfaces/icreate-prog-batch';
import { IProgramBatchesDetails, IProgramDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import {ProgramBatchesService} from 'src/app/core/services/program-batches-service/program-batches.service'
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-prog-batches-list',
  templateUrl: './prog-batches-list.component.html',
  styleUrls: ['./prog-batches-list.component.scss']
})
export class ProgBatchesListComponent implements OnInit {

  @Output() showAddBatchOverlayEvent = new EventEmitter<boolean>();
  @Output() showEditBatchOverlayEvent = new EventEmitter<boolean>();
  @Output() programBatchDetails = new EventEmitter<IProgramBatchesDetails>();
  @Output() isEdit = new EventEmitter<boolean>();
  @Output() patchId = new EventEmitter<string>();

  

  @Input() programDetails : IProgramDetails | undefined ;
  resMessage: BaseMessageModel = {};
  selectedIndex?: Number;
  PATCH_ID? :string;

  constructor(public translate: TranslateService,
    private programBatchesService: ProgramBatchesService,
    public dialog: MatDialog,
    private alertifyService : AlertifyService) { }

  ngOnInit(): void {
    this.updateProgBatchesListAfterAdd();
    
  }
  openDetails(id?:string){
    this.patchId.emit(id);
  }
  getFirstPatchID(){
    this.patchId.emit(this.PATCH_ID);

  }
  showAddBatchOverlay(){
    this.showAddBatchOverlayEvent.emit(true);
    this.isEdit.emit(false);
  }

  showEditBatchOverlay(event:IProgramBatchesDetails){
    this.showEditBatchOverlayEvent.emit(true);
    this.programBatchDetails.emit(event);
    this.isEdit.emit(true);
    // this.programBatchDetails = event;
  }

  updateProgBatchesListAfterAdd(){
    this.programDetails && this.programDetails.progBaseInfo && this.programDetails.progBaseInfo.id ?
    this.programBatchesService.getProgBatchesByProgId(this.programDetails?.progBaseInfo?.id).subscribe(res=>{
      if (res.isSuccess && this.programDetails){
        this.programDetails.progBats = res.data;
        if (this.programDetails.progBats){
          this.PATCH_ID= this.programDetails.progBats[0].id;
          this.getFirstPatchID();
        }
       
      }
      else{
        this.alertifyService.error(res.message || '');
      }
    },error => {

    }):'';
  }


  deleteProgBatch(id?:string){
    this.programBatchesService.deleteProgBatch(id || '').subscribe(res=>{
      if (res.isSuccess && this.programDetails){
        this.updateProgBatchesListAfterAdd();
      }
      else{
        this.alertifyService.error(res.message || '');
      }
    },error => {

    });
  }

  confirmDialog(id?: string) {
    const message = this.translate.currentLang === LanguageEnum.en ? "Are you sure that you want to delete this Batch" : "هل متأكد من حذف هذا القسم";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Delete Batch' : 'حذف القسم', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.programBatchesService.deleteProgBatch(id || '').subscribe(res=>{
          if (res.isSuccess && this.programDetails) {
            this.updateProgBatchesListAfterAdd();
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

}
