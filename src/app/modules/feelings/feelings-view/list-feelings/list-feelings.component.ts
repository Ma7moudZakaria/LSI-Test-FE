import { RoleEnum } from 'src/app/core/enums/role-enum.enum';
import { Component, Input, OnInit } from '@angular/core';
import { IFeelingsDetailsModel } from 'src/app/core/interfaces/feeling-interfaces/ifeelings-details-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { FeelingsService } from 'src/app/core/services/feelings/feelings.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { IDragDropAccordionItems } from 'src/app/core/interfaces/shared-interfaces/accordion-interfaces/idrag-drop-accordion-items';
import { IFeelingsFilter } from 'src/app/core/interfaces/feeling-interfaces/ifeelings-filter';
import { skip } from 'rxjs/operators';
import { IFeelingOrderModel } from 'src/app/core/interfaces/feeling-interfaces/ifeeling-order-model';
import { IFeelingSwapModel } from 'src/app/core/interfaces/feeling-interfaces/ifeeling-swap-model';

@Component({
  selector: 'app-list-feelings',
  templateUrl: './list-feelings.component.html',
  styleUrls: ['./list-feelings.component.scss']
})
export class ListFeelingsComponent implements OnInit {

  @Input() tabType: RoleEnum = RoleEnum.Student;

  tabTypeSelected = RoleEnum;

  feelingsNotPublishedList: IFeelingsDetailsModel[] = [];
  feelingsPublishedList: IFeelingsDetailsModel[] = [];
  resultMessage: BaseMessageModel = {};
  items1: any;
  listOrder?: number[];
  feelingFilter: IFeelingsFilter = { take: 2147483647, skip: 0 }
  feelingsOrder: IFeelingOrderModel = {};
  swapFeeling: IFeelingSwapModel = {};

  constructor
    (
      private feelingsServices: FeelingsService,
      public translate: TranslateService,
      public dialog: MatDialog,
      private alertify: AlertifyService,

  ) { }

  ngOnInit(): void {
    this.feelingFilter.usrRe = this.tabType;
    console.log("   this.feelingFilter.usrRe", this.feelingFilter.usrRe)

    this.feelingsOrder.usrTp = this.tabType;

    this.getNotPublishedFeelings()
    this.getPublishedFeelings()
  }

  getNotPublishedFeelings() {
    this.feelingsServices.getNotPublishedFeelings(this.feelingFilter).subscribe(res => {
      if (res.isSuccess) {
        this.feelingsNotPublishedList = res.data as IFeelingsDetailsModel[];
        this.feelingsNotPublishedList.forEach(element => {
          // element.crdOn = element.crdOn ? new Date(element.crdOn).toDateString() : '';
          element.isNew = true;
          if (!element?.proPic) {
            element.proPic = '../../../../../assets/images/Profile.svg';
          }
        });
        // this.resultMessage = {
        //   message: res.message || "",
        //   type: BaseConstantModel.SUCCESS_TYPE
        // }

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

  getPublishedFeelings() {
    this.feelingsServices.getPublishedFeelingsByFilter(this.feelingFilter).subscribe(res => {
      if (res.isSuccess) {
        this.feelingsPublishedList = res.data as IFeelingsDetailsModel[];
        this.feelingsPublishedList.forEach(element => {
          // element.crdOn = element.crdOn ? new Date(element.crdOn).toDateString() : '';
          element.isNew = false;
          if (!element?.proPic) {
            element.proPic = '../../../../../assets/images/Profile.svg';
          }
        });

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

  deleteFeeling(event: IFeelingsDetailsModel) {
    const message = this.translate.currentLang === LanguageEnum.en ? "Are you sure that you want to delete this feeling" : "هل متأكد من حذف هذه المشاعر ";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Delete feeling ' : 'حذف  المشاعر', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.feelingsServices.deleteFeelings(event.id || '').subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(res.message || '');
            this.getNotPublishedFeelings();
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

  cancelFeeling(event: IFeelingsDetailsModel) {
    const message = this.translate.currentLang === LanguageEnum.en ? "Are you sure that you want to cancel this feeling" : "هل متأكد من الغاء نشر هذه المشاعر ";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Cancel feeling ' : 'الغاء نشر  المشاعر', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.approveCancelFeeling(event);
      }
    });
  }

  approveCancelFeeling(event: IFeelingsDetailsModel) {
    this.feelingsServices.approvecCancelFeeling(event.id || '').subscribe(res => {
      if (res.isSuccess) {
        this.getNotPublishedFeelings();
        this.getPublishedFeelings();
      }
      else {

      }
    }, error => {

    })
  }

  drop(event: CdkDragDrop<IDragDropAccordionItems[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.listOrder = [];
      for (let i = 0; i <= event.container.data.length - 1; i++) {
        this.listOrder?.push(event.previousContainer.data[i].order || (i + 1));
      }

      this.feelingsOrder.orderList = this.listOrder;

      this.feelingsServices.updateFeelingsOrder(this.feelingsOrder).subscribe(res => {
        if (res.isSuccess) {
          this.getPublishedFeelings();
        }
        else {

        }
      },
        error => {
          this.resultMessage = {
            message: error,
            type: BaseConstantModel.DANGER_TYPE
          }
        })
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  swapUp(event: IFeelingsDetailsModel) {
    this.swapFeeling.feelA = event.id;
    let feelAIndex = this.feelingsPublishedList.indexOf(event);
    if (feelAIndex - 1 >= 0) {
      this.swapFeeling.feelB = this.feelingsPublishedList[this.feelingsPublishedList.indexOf(event) - 1].id;
      this.swapFeelingsItems();
    }
  }

  swapDown(event: IFeelingsDetailsModel) {
    this.swapFeeling.feelA = event.id;
    let feelBIndex = this.feelingsPublishedList.indexOf(event);
    if (feelBIndex + 1 < this.feelingsPublishedList.length) {
      this.swapFeeling.feelB = this.feelingsPublishedList[this.feelingsPublishedList.indexOf(event) + 1].id;
      this.swapFeelingsItems();
    }
  }

  swapFeelingsItems() {
    this.feelingsServices.swapFeelings(this.swapFeeling).subscribe(res => {
      if (res.isSuccess) {
        this.getPublishedFeelings();
      }
      else {

      }

    }, error => {
      this.resultMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    })
  }
}
