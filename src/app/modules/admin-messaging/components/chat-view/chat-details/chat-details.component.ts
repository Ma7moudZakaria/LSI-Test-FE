import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as firebase from 'firebase';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IGroupChat } from 'src/app/core/interfaces/chat-interfaces/igroup-chat';
import { IMessageChat } from 'src/app/core/interfaces/chat-interfaces/imessage-chat';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { Guid } from 'src/app/core/ng-model/generate-guid';
import { ChatService } from 'src/app/core/services/chat-services/chat.service';

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.scss']
})
export class ChatDetailsComponent implements OnInit {
  langEnum=LanguageEnum;
  listOfMessagess:IMessageChat[] = [];
  addMessageToChatGroup:IMessageChat | undefined;
  resultMessage: BaseMessageModel = {};
  currentUser: IUser | undefined;
  messageChat:string | undefined;
  messageAttachURL:string | undefined;
  groupData = {} as IGroupChat ;
  
  constructor(public translate: TranslateService , public chatService:ChatService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
  }

  addMessageToGroup(message?:string , messageAttachURL?:string){
    this.messageChat = '';
    
    var last_date = formatDate(new Date(), 'dd-MM-yyyy HH:mm:ss', 'en');
    if(message == null || ''){
      this.addMessageToChatGroup = {
        date:last_date,
        sender_id:this.currentUser?.id,
        sender_name:this.translate.currentLang === LanguageEnum.ar ? this.currentUser?.fullNameAr : this.currentUser?.fullNameEn,
        sender_name_ar:this.currentUser?.fullNameAr,
        sender_name_en:this.currentUser?.fullNameEn,
        message:messageAttachURL,
        message_type:'file'
      };
    }
    else{
      this.addMessageToChatGroup = {
        date:last_date,
        sender_id:this.currentUser?.id,
        sender_name:this.translate.currentLang === LanguageEnum.ar ? this.currentUser?.fullNameEn : this.currentUser?.fullNameEn,
        sender_name_ar:this.currentUser?.fullNameAr,
        sender_name_en:this.currentUser?.fullNameEn,
        message:message,
        message_type:'text'
      };      
    }

    if(this.groupData?.last_message || this.groupData?.last_message == ""){
      this.groupData.last_date = last_date;
      this.groupData.last_message = message;
    }   

    if(this.groupData?.messages != null){
      this.chatService.pushNewMessageToMessages(this.groupData?.key , this.addMessageToChatGroup);
      this.listOfMessagess.push(this.addMessageToChatGroup);
    }
    else{
      //if chat group messages not created ,,, will create it and push first message on it
      var Value = this.addMessageToChatGroup;
      var map:any = [];
      map[Guid.newGuid()] = Value;
      this.groupData = {
        key:this.groupData?.key,
        group_name: this.groupData?.group_name,
        allowed:this.groupData?.allowed,       
        last_date: this.groupData?.last_date,
        last_message: message,
        messages: this.groupData?.messages == null ? map : this.groupData?.messages,
        participants:this.groupData?.participants
      }

      this.chatService.pushLatestMessageToGroups(this.groupData);
    }
  }

  getGroupMessages(){
    this.chatService.getGroupMessages(this.groupData);

    this.listOfMessagess = this.chatService.allMessagesList || [];
  }
}
