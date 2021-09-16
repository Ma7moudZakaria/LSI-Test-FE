import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { IGroupChat } from '../../interfaces/chat-interfaces/igroup-chat';
import { IMessageChat } from '../../interfaces/chat-interfaces/imessage-chat';
import { IParticipantChat } from '../../interfaces/chat-interfaces/iparticipant-chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  allChatGroupsList : IGroupChat[] = [];
  allParticipantsList : IParticipantChat[] = [];
  allMessagesList : IMessageChat[] = [];
  allParticipantsOfGroupList : IParticipantChat[] = [];
  constructor() { }

  async getAllChatGroups() {
    firebase.database().ref('groups/').on('value', (res: any) => {
      var sdfsfsff = res;
      res.forEach((element : any) => {
        let item = element.val();
        // var DataOfMessages = Object.values(item.messages || []) as IMessageChat[]; 
        // this.allChatGroupsList = DataOfMessages.sort((a, b) => {
        //   return <any>new Date(b.date) - <any>new Date(a.date);
        // });
        this.allChatGroupsList?.push({
          key: item.key,
          allowed: item.allowed,
          group_name: item.group_name,
          last_date: item.last_date,
          last_message: item.last_message,
          messages: Object.values(item.messages || []),
          participants: Object.values(item.participants || []),
        })  
      });      

      this.allChatGroupsList = this.allChatGroupsList.sort((a, b) => {
        return <any>new Date(a.last_date) - <any>new Date(b.last_date);
      });
    });    
  }
  
  async getAllParticipants() {
    this.allParticipantsList = [];
    firebase.database().ref('users/').on('value', (res: any) => {
      res.forEach((element : any) => {
        let item = element.val();
        this.allParticipantsList?.push({
          key:element.key,
          id:element.key,
          gender:item.gender,
          hoffazId:item.hoffazId,
          role:item.role,
          groups:item.groups,
          name_ar:item.name_ar,
          name_en:item.name_en,
          avatar_url:item.avatar_url
        })  
      });
    });
  }

  async deleteGroup(id?:string) {
    firebase.database().ref('groups/' + id).remove();
  }

  async deleteGroupParticipants(model: IParticipantChat[], groupId:string) {
    Array.from(model).forEach((elmOfParticipant: IParticipantChat) => {
      var URL = 'users/' + elmOfParticipant.id + '/groups/' + groupId;
      firebase.database().ref('users/').child(elmOfParticipant.id + '/').child('/groups/').child(groupId).remove();
    });
  }

  async getGroupMessages(model:IGroupChat) {
    firebase.database().ref('groups/' + model.key).on('value', (res: any) => {
      let item = res.val();
      this.allMessagesList = Object.values(item.messages || []) as IMessageChat[]; 
      this.allMessagesList = this.allMessagesList.sort((a, b) => {
        return <any>new Date(a.date) - <any>new Date(b.date);
      });
    });
  }

  async pushLatestMessageToGroups(model?:IGroupChat) {
    firebase.database().ref('groups/' + model?.key).set(model);
  }

  async pushNewMessageToMessages(Id?:string, model?:IMessageChat) {
    firebase.database().ref('groups/').child(Id + '/').child("messages").push(model);
  }

  async isGroupExist(model:any ) {
    firebase.database().ref('groups/').equalTo(model.groupNameAr || model.groupNameEn);
    firebase.database().ref('groups/').isEqual(model.groupNameAr || model.groupNameEn);
    // firebase.database().ref('groups/').on('value', (res: any) => {
    //   res.forEach((element : any) => {
    //     let item = element.val();
    //     this.allChatGroupsList?.push({
    //       key: item.key,
    //       allowed: item.allowed,
    //       group_name: item.group_name,
    //       last_date: item.last_date,
    //       last_message: item.last_message,
    //       messages: Object.values(item.messages || []),
    //       participants: Object.values(item.participants || []),
    //     })  
    //   });
    // });
  }

  async addGroup(selectedParticipantsList:IParticipantChat[] , model:IGroupChat , groupId:any ) {
      // Add Participants To Group
        Array.from(selectedParticipantsList).forEach((elm: IParticipantChat) => {
          if(elm.groups === null || elm.groups === undefined || elm.groups.length === 0){
            elm.groups = [];
          }
        });

        firebase.database().ref('groups/' + groupId).set(model);

        // Add Groups To Participant
        Array.from(selectedParticipantsList).forEach((elm: IParticipantChat) => {        
          if(elm.groups){
            elm.groups[groupId] = groupId;    
          }

          const updateGroupToUsersRoom = firebase.database().ref('users/' + elm.key +'/' + 'groups');
          updateGroupToUsersRoom.set(elm.groups);
        });
  }
}
