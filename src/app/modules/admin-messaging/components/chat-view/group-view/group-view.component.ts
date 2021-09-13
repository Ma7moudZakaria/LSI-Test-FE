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
  @Output() groupDetailsEvent = new EventEmitter<IGroupChat>();
  listOfGroups:IGroupChat[] = [];
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
      
     
    });
  }

  getParticipantsFormFirebase(id?:string){
    var Data;
    var GetGroupData = this.listOfGroups?.filter(x => x.key == id);

    console.log("GetGroupData[0].participants : " , GetGroupData[0].participants);

    for(let item in GetGroupData[0].participants){
      var x = item;
      this.getAllParticipantByGroupId(item);
    }

    this.deleteGroup(this.usersList , id);
  }

  deleteGroup(listOfUsers:IParticipantChat[], id?:string){ 
    Array.from(listOfUsers).forEach((elmOfParticipant: IParticipantChat) => {
      var IsExist = elmOfParticipant?.groups?.some(x => x == id || '')
      if(IsExist){
        // firebase.database().ref('users/' + elmOfParticipant.key + '/groups/' + id).remove(error => {
        //   this.alertify.error(error?.message || '');
        // });

        let index = elmOfParticipant?.groups?.indexOf(id || '');
        elmOfParticipant.groups?.splice(index || 0, 1);

        const updateGroupToUsersRoom = firebase.database().ref('users/' + elmOfParticipant.key +'/' + 'groups/');
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

  getGroupDetails(event:IGroupChat) {
    console.log("this.listOfGroups" , this.listOfGroups);
    this.groupDetailsEvent.emit(event);
  }
}