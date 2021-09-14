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
  lastMe = new Array;
  // participantsList: any[] = [];
  usersList: any[] = [];
  Data: { [Id: string]: IMessageChat; } = {};
  ListOfUsers: any;
  langEnum = LanguageEnum;
  groupFilter: IGroupChat = {};

  constructor(private alertify: AlertifyService, public chatService:ChatService,
    private translate: TranslateService) { }

  ngOnInit(): void {
    this.chatService.getAllChatGroups();
  }

  getAllGroups() {
    
  }

  getParticipantsFormFirebase(participants?: any , id?:string) {
    this.usersList = Object.values(participants || []) as IParticipantChat[];

    this.deleteGroup(this.usersList, id);
  }

  deleteGroup(listOfUsers: IParticipantChat[], id?: string) {
    Array.from(listOfUsers).forEach((elmOfParticipant: IParticipantChat) => {
      var IsExist = elmOfParticipant?.groups?.some(x => x == id || '')
      if (IsExist) {
        let index = elmOfParticipant?.groups?.indexOf(id || '');
        elmOfParticipant.groups?.splice(index || 0, 1);

        const updateGroupToUsersRoom = firebase.database().ref('users/' + elmOfParticipant.key + '/' + 'groups/');
        updateGroupToUsersRoom.set(elmOfParticipant.groups);
      }
    });


    firebase.database().ref('groups/' + id).remove(error => {
      this.alertify.success("Group Deleted Successfully");
    });
  }

  showAdd() {
    this.createGroupOverlayEvent.emit(true)
  }

  getGroupDetails(event: IGroupChat) {
    console.log("this.listOfGroups", this.listOfGroups);
    this.groupDetailsEvent.emit(event);
  }

  filterByText(searchKey: string) {
    this.groupFilter.group_name = searchKey;

    // this.getParticipants(this.participantFilter);
  }
}