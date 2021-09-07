import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// import { getDatabase, orderByChild, query, ref } from '@firebase/database';
import * as firebase from 'firebase';
import { IGroupChat } from 'src/app/core/interfaces/chat-interfaces/igroup-chat';
import { IMessageChat } from 'src/app/core/interfaces/chat-interfaces/imessage-chat';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit {
  listOfGroups:IGroupChat[] | undefined;
  listOfMessages:IMessageChat[] | undefined;
  selectedIndex: number = 0;
  originalOrder:any;

  constructor() { }

  ngOnInit(): void {
    this.getAllGroups();
  }

  getAllGroups(){
    this.originalOrder = (a: KeyValue<number,string>, b: KeyValue<number,string>): number => {
      return 0;
    }
    // const db = getDatabase();
    // const mostViewedPosts = query(ref(db, 'groups'), orderByChild('group_name/messages'));

    // const mostViewedPosts = firebase.database().ref('groups/group_name').orderByChild('messages')

    firebase.database().ref('groups/').orderByChild('messages').on('value', (resp2: any) => {
      var Data = snapshotToArray(resp2);
      
      this.listOfGroups = Data;
      console.log("Groups : " , this.listOfGroups)
      if(this.listOfGroups){
        for(let i = 0; i < this.listOfGroups?.length; i++){
          var MessageData = this.listOfGroups[0].messages
          for(var prop in  MessageData.reverse) {
            // console.log("Message : ", this.listOfMessages?.push(MessageData[prop]));  
          }
          console.log("Message : " ,  this.listOfMessages);
          // for(let x = 0; x < this.listOfGroups[i].messages.length; x++){
          //   var MeassageData = this.listOfGroups[i].messages[x]
          //   console.log("Message : " , this.listOfGroups[i].messages[x]);
          // }
            // this.listOfMessages = this.listOfGroups[i].messages;
            // console.log("Messages : " , this.listOfMessages)
          // firebase.database().ref('groups/' + this.listOfGroups[i].key).orderByChild('messages').on('value', (resp2: any) => {
          //   var Data = snapshotToArray(resp2);
          //   this.listOfMessages = snapshotToArray(resp2);
          //   console.log("Messages : " , this.listOfMessages)
          // });
        }
      }
    });

    
    

    
    // firebase.database().ref('groups/').on('value' , x => this.listOfGroups = x.val(), a => console.log("Groups : " , x.val()));
    // this.listOfGroups = firebase.database().ref('groups/').on('value' , x => console.log("Groups : " , x.val()));
  }
}

export const snapshotToArray = (snapshot: any) => {
  const returnArr: any[] = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
