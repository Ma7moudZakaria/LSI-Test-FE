import { Component, OnInit } from '@angular/core';
import { IFeelingsDetailsModel } from 'src/app/core/interfaces/feeling-interfaces/ifeelings-details-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { FeelingsService } from 'src/app/core/services/feelings/feelings.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';

@Component({
  selector: 'app-list-feelings',
  templateUrl: './list-feelings.component.html',
  styleUrls: ['./list-feelings.component.scss']
})
export class ListFeelingsComponent implements OnInit {

  FeelingsDetailsModel: IFeelingsDetailsModel[] = [];
  resultMessage: BaseMessageModel = {};

  constructor
    (
      private feelingsServices: FeelingsService,
      public translate: TranslateService,
      public dialog: MatDialog,
      private alertify: AlertifyService,

  ) { }

  ngOnInit(): void {
  }


  getAllFeelings(id: any) {
    this.feelingsServices.getAllFeelings(id || '').subscribe(res => {
      this.FeelingsDetailsModel = res.data as IFeelingsDetailsModel[];
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

  deleteFeelingCard(id: string) {
    const message = this.translate.currentLang === LanguageEnum.en ? "Are you sure that you want to delete this feeling" : "هل متأكد من حذف هذه المشاعر ";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Delete feeling ' : 'حذف  المشاعر', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.feelingsServices.deleteFeelings(id || '').subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(res.message || '');

          }
          else {
            this.alertify.error(res.message || '');
          }
        }, error => {
          this.alertify.error(error || '');
        }
        )
      }
    });
  }







}
