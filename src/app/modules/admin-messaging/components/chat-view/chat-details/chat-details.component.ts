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

@Component({
  selector: 'app-chat-details',
  templateUrl: './chat-details.component.html',
  styleUrls: ['./chat-details.component.scss']
})
export class ChatDetailsComponent implements OnInit {
  langEnum=LanguageEnum;
  listOfChats:IMessageChat[] = [];
  listOfMessagess:IMessageChat[] = [];
  addMessageToChatGroup:IMessageChat | undefined;
  resultMessage: BaseMessageModel = {};
  currentUser: IUser | undefined;
  messageChat:string | undefined;
  messageAttachURL:string | undefined;
  groupData:IGroupChat | undefined;
  
  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
  }

  addMessageToGroup(message?:string , messageAttachURL?:string){
    var last_date = formatDate(new Date(), 'dd-MM-yyyy HH:mm:ss', 'en');
    if(message == null || ''){
      this.addMessageToChatGroup = {
        // key: Guid.newGuid(),
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
        // key: Guid.newGuid(),
        date:last_date,
        sender_id:this.currentUser?.id,
        sender_name:this.translate.currentLang === LanguageEnum.ar ? this.currentUser?.fullNameEn : this.currentUser?.fullNameEn,
        sender_name_ar:this.currentUser?.fullNameAr,
        sender_name_en:this.currentUser?.fullNameEn,
        message:message,
        message_type:'text'
      };      
    }

    if(this.groupData?.last_message){
      this.groupData.last_message = message;
    }
    // else{
    //   // var MessageValue;
    //   // if(this.groupData?.messages){
    //   //   this.groupData?.messages[Guid.newGuid()] = this.addMessageToChatGroup ;
    //   // }
      
    // }
    

    this.messageChat = '';

    if(this.groupData?.messages != null){
      firebase.database().ref('groups/' + this.groupData?.key).update(this.groupData || '' , (e:any) => {});
      firebase.database().ref('groups/' + this.groupData?.key + '/' + 'messages/').push(this.addMessageToChatGroup , (a:any) => {
        var Data = a;
      });   
      this.listOfMessagess.push(this.addMessageToChatGroup);
      console.log("this.listOfMessagess" , this.listOfMessagess);
      // this.listOfMessagess = this.listOfMessagess.sort((a, b) => {
      //   return <any>new Date(a.date) - <any>new Date(b.date);
      // });
    }
    else{
      var Value = this.addMessageToChatGroup;
      var map: { [Id: string]: any; } = { };
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
      firebase.database().ref('groups/' + this.groupData?.key).set(this.groupData || '' , (e:any) => {});
      // firebase.database().ref('groups/' + this.groupData?.key + '/' + 'messages/').set(this.addMessageToChatGroup , (a:any) => {}); 
    }

    
    
    //this.getGroupMessages(this.groupData);
  }

  getGroupMessages(model:IGroupChat){
    this.listOfChats = [];
    this.listOfMessagess = [];
    this.groupData = model;
    
    this.listOfChats.push(model?.messages || {});
    for(let item in this.listOfChats){
      var Data = this.listOfChats[item] as any[];
      for(let itemTwo in Data){
        this.listOfMessagess.push(Data[itemTwo]);
      }        
    }

    this.listOfMessagess = this.listOfMessagess.sort((a, b) => {
      return <any>new Date(a.date) - <any>new Date(b.date);
    });

    
    console.log("list Of Messagess : ",this.listOfMessagess);
  }
}
