import { KeyValue } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as firebase from 'firebase';
import { IGroupChat } from 'src/app/core/interfaces/chat-interfaces/igroup-chat';
import { IMessageChat } from 'src/app/core/interfaces/chat-interfaces/imessage-chat';
import { ChatResponseModel } from 'src/app/core/ng-model/chat-response-model';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit {
  @Output() createGroupOverlayEvent = new EventEmitter<boolean>();
  listOfGroups:IGroupChat[] | undefined;
  selectedIndex: number = 0;
  lastMe = new Array;

  Data: { [Id: string]: IMessageChat; } = {};

  constructor() { }

  ngOnInit(): void {
    this.getAllGroups();
  }

  getAllGroups(){ 
    firebase.database().ref('groups/').orderByChild('messages').on('value', (resp2: any) => {
      this.listOfGroups = ChatResponseModel.snapshotToArray(resp2);
    });
  }

  showAdd() {
    this.createGroupOverlayEvent.emit(true)
  }
}

// export const snapshotToArray = (snapshot: any) => {
//   const returnArr: any[] = [];

//   snapshot.forEach((childSnapshot: any) => {
//     const item = childSnapshot.val();
//     item.key = childSnapshot.key;
//     returnArr.push(item);
//   });

//   return returnArr;
// };
