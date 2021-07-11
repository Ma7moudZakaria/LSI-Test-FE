import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

import { IProgramNotificationDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-notification-details';

import { MatDialog } from '@angular/material/dialog';
import { IProgramNotificationModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-notification-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ProgramNotificationService } from 'src/app/core/services/program-services/program-notification.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { LookupsEnum } from 'src/app/core/enums/lookups-enum.enum';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { IProgramBasicInfoDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {
  notificationsCardList: IProgramNotificationDetails[] = [];

  constructor(private notificationService: ProgramNotificationService,
    public translate: TranslateService, public dialog: MatDialog,
    private alertify: AlertifyService,
    private lookupService: LookupService
  ) { }

  collectionOfLookup = {} as ILookupCollection;
  listOfLookup: string[] = ['PROG_NOTIF_TYPES'];
  notificationDetails = {} as IProgramNotificationDetails;
  resultMessage: BaseMessageModel = {};

  @Output() openNotifyfrom = new EventEmitter<IProgramNotificationDetails>();
  @Input() progId?: string = '';
  // @Input() progBasicInfoDetails:IProgramBasicInfoDetails | undefined;

  ngOnInit(): void {
    this.getLookupByKey();
    console.log("progBasicInfoDetails Notify id===========>", this.progId);
  }

  getLookupByKey() {
    this.lookupService.getLookupByKey(this.listOfLookup).subscribe(res => {
      if (res.isSuccess) {
        this.collectionOfLookup = res.data as ILookupCollection;
        this.getAllNotifications(this.progId);
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

  getAllNotifications(id: any) {
    this.notificationService.getAllNotifications(this.progId || '').subscribe(res => {
      this.notificationsCardList = res.data as IProgramNotificationDetails[];

      this.notificationsCardList.forEach(item => {
        item.notifyTypeLookup = this.collectionOfLookup.PROG_NOTIF_TYPES?.filter(i => i.id === item.notifyType)[0]
      })
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

  deleteCardNotify(id: string) {
    const message = this.translate.currentLang === LanguageEnum.en ? "Are you sure that you want to delete this notification" : "هل متأكد من حذف هذا التنبيه ";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Delete notification' : 'حذف  التنبيه', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.notificationService.deleteNotification(id || '').subscribe(res => {
          if (res.isSuccess) {
            this.alertify.success(res.message || '');
            this.getAllNotifications(id);
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
