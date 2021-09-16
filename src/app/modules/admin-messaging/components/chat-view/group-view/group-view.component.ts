import { TranslateService } from '@ngx-translate/core';
import { KeyValue } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as firebase from 'firebase';
import { IGroupChat } from 'src/app/core/interfaces/chat-interfaces/igroup-chat';
import { IMessageChat } from 'src/app/core/interfaces/chat-interfaces/imessage-chat';
import { IParticipantChat } from 'src/app/core/interfaces/chat-interfaces/iparticipant-chat';
import { ChatResponseModel } from 'src/app/core/ng-model/chat-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ChatService } from 'src/app/core/services/chat-services/chat.service';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit {
  @Output() createGroupOverlayEvent = new EventEmitter<boolean>();
  @Output() groupDetailsEvent = new EventEmitter<IGroupChat>();
  listOfGroups: IGroupChat[] = [];
  selectedIndex: number = 0;
  langEnum = LanguageEnum;
  groupFilter: IGroupChat = {};

  constructor(private alertify: AlertifyService, public chatService:ChatService,
    private translate: TranslateService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.chatService.getAllChatGroups();    
    this.listOfGroups = this.chatService.allChatGroupsList;
  }

  deleteGroup(listOfUsers?: IParticipantChat[], id?: string) {
    const message = this.translate.currentLang === LanguageEnum.en ? "Are you sure that you want to delete this Group" : "هل متأكد من حذف هذه المجموعة";

    const dialogData = new ConfirmDialogModel(this.translate.currentLang === LanguageEnum.en ? 'Delete Group' : 'حذف المجموعة', message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.chatService.deleteGroupParticipants(listOfUsers || [] , id || '');
        this.chatService.deleteGroup(id);
        this.alertify.success( this.translate.currentLang === LanguageEnum.en ? "Group Deleted Successfully" : 'تم حذف المجموعة بنجاح');  
      }
    });
  }

  showAdd() {
    this.createGroupOverlayEvent.emit(true)
  }

  getGroupDetails(event: IGroupChat) {
    this.groupDetailsEvent.emit(event);
  }

  filterByText(searchKey: string) {
    if(searchKey.length > 0){
      this.listOfGroups = this.listOfGroups.filter(x => x.group_name?.includes(searchKey));
    }
    else{
      this.listOfGroups = this.chatService.allChatGroupsList;
    }
  }
}