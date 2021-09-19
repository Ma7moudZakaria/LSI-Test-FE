import { Component, OnInit, ViewChild } from '@angular/core';
import { IGroupChat } from 'src/app/core/interfaces/chat-interfaces/igroup-chat';
import { ChatDetailsComponent } from './chat-details/chat-details.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { GroupViewComponent } from './group-view/group-view.component';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {
  @ViewChild(GroupViewComponent) groupViewComponent: GroupViewComponent | undefined;
  @ViewChild(GroupDetailsComponent) groupDetailsComponent: GroupDetailsComponent | undefined;
  @ViewChild(ChatDetailsComponent) chatDetailsComponent: ChatDetailsComponent | undefined;

  openCreateGroupOverlay: boolean = false;
  openEditGroupOverlay: boolean = false;
  
  createGroupChat = {} as IGroupChat;
  editGroupChat = {} as IGroupChat;

  constructor() { }

  ngOnInit(): void {
  }

  closeCreateGroupOverlay(event: IGroupChat) {
    this.openCreateGroupOverlay = false;
    this.createGroupChat = event;
    this.groupViewComponent?.getGroupDetails(event);
  }

  closeEditGroupOverlay(event: IGroupChat) {
    this.openEditGroupOverlay = false;
    this.editGroupChat = event;
    this.groupViewComponent?.getGroupDetails(event);
  }

  openCreateGroupPopup(event: boolean) {
    this.openCreateGroupOverlay = true;
  }  

  // openEditGroupPopup(model: IGroupChat) {
  //   this.openEditGroupOverlay = true;
  //   this.editGroupChat = model;
  // }  

  groupDetailsForEditEvent(event: IGroupChat) {
    console.log("editGroupChat" , this.editGroupChat);
    this.editGroupChat = event;
    this.openEditGroupOverlay = true;
  }

  groupDetailsEvent(event: IGroupChat) {
    if (this.groupDetailsComponent){
      this.groupDetailsComponent.groupModel = event;
      this.groupDetailsComponent.allowed = event.allowed;
      this.groupDetailsComponent.listOfParticipants = event.participants || [];
    }

    if (this.chatDetailsComponent){
      this.chatDetailsComponent.groupData = event;
      this.chatDetailsComponent.getGroupMessages();
    }
  }
}
