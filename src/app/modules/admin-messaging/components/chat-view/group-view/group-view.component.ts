import { KeyValue } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as firebase from 'firebase';
import { IGroupChat } from 'src/app/core/interfaces/chat-interfaces/igroup-chat';
import { IMessageChat } from 'src/app/core/interfaces/chat-interfaces/imessage-chat';
import { IParticipantChat } from 'src/app/core/interfaces/chat-interfaces/iparticipant-chat';
import { ChatResponseModel } from 'src/app/core/ng-model/chat-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit {
  @Output() createGroupOverlayEvent = new EventEmitter<boolean>();
  listOfGroups:any[] = [];
  selectedIndex: number = 0;
  lastMe = new Array;
  participantsList:any[] = [];
  usersList:any[] = [];
  Data: { [Id: string]: IMessageChat; } = {};
  ListOfUsers:any;

  constructor( private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.getAllGroups();
  }

  getAllGroups(){ 
    firebase.database().ref('groups/').orderByChild('messages').on('value', (resp2: any) => {
      this.listOfGroups = ChatResponseModel.snapshotToArray(resp2);
    });
  }

  getAllParticipantByGroupId(id?: string){ 
    firebase.database().ref('users/').orderByChild('messages').on('value', (resp2: any) => {

      var Data = ChatResponseModel.snapshotToArray(resp2) as { [Id: string]: IParticipantChat; } [];
      
      this.participantsList.push(Data || {});

      Array.from(this.participantsList).forEach((elm: any) => {
        Array.from(elm).forEach((elmOfParticipant: any) => {
          if(elmOfParticipant.key === id){
            this.usersList.push(elmOfParticipant);
          }
        });
      });



      // for(let item in this.participantsList){
      //   this.ListOfUsers = this.participantsList[item];
      //   for(let itemTwo in this.ListOfUsers){
      //     var Id = this.ListOfUsers[itemTwo].key ;
      //     var x = this.ListOfUsers.filter(Id === id);
      //     this.usersList.push(x);
      //   }
      // }

    //  var x = this.participantsList.filter(x => this.participantsList[x].key === id);
    //  this.usersList.push(x);
     console.log("this.participantsList :" , this.usersList);
    });
  }

  getParticipantsFormFirebase(id?:string){
    var Data;
    var GetGroupData = this.listOfGroups?.filter(x => x.key == id);

    for(let item in GetGroupData[0].participants){
      var x = item;
      this.getAllParticipantByGroupId(item);

      // firebase.database().ref('users/').orderByChild(item).on('value', (resp2: any) => {
      //   Data = ChatResponseModel.snapshotToArray(resp2);
      // });
      // this.participantsList.push(Data || {});
    }

    // this.deleteGroup(this.participantsList , id)
  }

  deleteGroup(listOfUsers?:IParticipantChat[], id?:string){ 
    // for(let item in listOfUsers){
    //   let index = this.participantsList.indexOf(item);
    //   this.participantsList.splice(index, 1);
    // }

    const newGroupRoom = firebase.database().ref('groups/' + id).remove(error => {
      this.alertify.error(error?.message || '');
    });
  }

  showAdd() {
    this.createGroupOverlayEvent.emit(true)
  }
}