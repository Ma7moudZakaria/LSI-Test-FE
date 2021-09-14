import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { IGroupChat } from '../../interfaces/chat-interfaces/igroup-chat';
import { IMessageChat } from '../../interfaces/chat-interfaces/imessage-chat';
import { ChatResponseModel } from '../../ng-model/chat-response-model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  allChatGroupsList : IGroupChat[] = [];
  constructor() { }

  async getAllChatGroups() {
    firebase.database().ref('groups/').on('value', (res: any) => {
      // return ChatResponseModel.snapshotToArray(resp2);
      // this.allChatGroupsList = ChatResponseModel.snapshotToArray(resp2);
      res.forEach((element : any) => {
        let item = element.val();
        this.allChatGroupsList?.push({
          key: item.key,
          allowed: item.allowed,
          group_name: item.group_name,
          last_date: item.last_date,
          last_message: item.last_message,
          messages1: Object.values(item.messages || []),
          participants1: Object.values(item.participants || []),
        })  
      });
      console.log(this.allChatGroupsList);
    });
  }
}
