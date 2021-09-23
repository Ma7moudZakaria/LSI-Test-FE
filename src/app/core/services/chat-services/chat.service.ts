
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as moment from 'moment';
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
  participantGroupsIdList  : string[] = [];
  chatGroup : IGroupChat | undefined;
  participantModel = {} as IParticipantChat;

  constructor() { }

  async getAllChatGroups() {
    firebase.database().ref('groups/').on('value', (res: any) => {
      var sdfsfsff = res;
      res.forEach((element : any) => {
        let item = element.val();
        
        let IsExist = this.allChatGroupsList.some(x => x.key == item.key);
        if(!IsExist){
          this.allChatGroupsList?.push({
            key: item.key,
            allowed: item.allowed,
            group_name: item.group_name,
            last_date: item.last_date,
            last_message: item.last_message,
            messages: Object.values(item.messages || []),
            participants: Object.values(item.participants || []),
          });         
        }        
      });      
      // this.allChatGroupsList = this.allChatGroupsList.sort((a, b) => {
      //   return b.last_date.localeCompare(a.last_date);
      // });
      this.allChatGroupsList =  this.allChatGroupsList.sort((a, b) => {
        // var dateToFormatLastDateA = a.last_date;
        // moment(dateToFormatLastDateA).format("DD/MM/YYYY"); 

        // var dateToFormatLastDateB = b.last_date;
        // moment(dateToFormatLastDateB).format("DD/MM/YYYY"); 
        
        // var diff = dateToFormatLastDateA.diff(dateToFormatLastDateB);
        // console.log("diff" , diff);

        // if(dateToFormatLastDateA > dateToFormatLastDateB){
        //   return 1;
        // }
        
        // if(dateToFormatLastDateB > dateToFormatLastDateA){
        //   return -1;
        // }


        return Date.parse(b.last_date) - Date.parse(a.last_date);



      });
      
      console.log("this.allChatGroupsList" , this.allChatGroupsList)
    });    
  }

  async getAllGroupBId(groupsId:string) {
    firebase.database().ref('groups/' + groupsId).on('value', (res: any) => {
      this.chatGroup = res.val();
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

  async getAllGroupsByParticipantId(participantId:string) {    
    this.allChatGroupsList = [];
    firebase.database().ref('users/' + participantId + "/").on('value', (res: any) => {
      let item = res.val();
      let listOfGroupsId = Object.values(item.groups || []) 
      listOfGroupsId.forEach((element : any) => {
        this.participantGroupsIdList?.push(element);
        // this.getAllParticipantGroups(element);
        firebase.database().ref('groups/' + element).on('value', (res: any) => {
          let item = res.val();
          let IsExist = this.allChatGroupsList.some(x => x.key == item.key);
          if(!IsExist){
            this.allChatGroupsList?.push({
              key: item.key,
              allowed: item.allowed,
              group_name: item.group_name,
              last_date: item.last_date,
              last_message: item.last_message,
              messages: Object.values(item.messages || []),
              participants: Object.values(item.participants || []),
            }) ;
      
            this.allChatGroupsList = this.allChatGroupsList.sort((a, b) => {
              return <any>new Date(a.last_date) - <any>new Date(b.last_date);
            });
          }
          
        }); 
      });

      // this.getAllParticipantGroups(this.participantGroupsIdList);
    });

    
  }

  async getAllParticipantGroups(groupsId:string) {
    
    firebase.database().ref('groups/' + groupsId).on('value', (res: any) => {
      let item = res.val();
      this.allChatGroupsList?.push({
        key: item.key,
        allowed: item.allowed,
        group_name: item.group_name,
        last_date: item.last_date,
        last_message: item.last_message,
        messages: Object.values(item.messages || []),
        participants: Object.values(item.participants || []),
      }) ;

      this.allChatGroupsList = this.allChatGroupsList.sort((a, b) => {
        return <any>new Date(a.last_date) - <any>new Date(b.last_date);
      });
    }); 

    // if(groupsId.length > 0){
    //   Array.from(groupsId).forEach((id: string) => {
    //     var IsExist = this.allChatGroupsList.some(x => x.key === id);
    //     if(!IsExist){
    //       firebase.database().ref('groups/' + id).on('value', (res: any) => {
    //         let item = res.val();
    //         this.allChatGroupsList?.push({
    //           key: item.key,
    //           allowed: item.allowed,
    //           group_name: item.group_name,
    //           last_date: item.last_date,
    //           last_message: item.last_message,
    //           messages: Object.values(item.messages || []),
    //           participants: Object.values(item.participants || []),
    //         }) ;
      
    //         this.allChatGroupsList = this.allChatGroupsList.sort((a, b) => {
    //           return <any>new Date(a.last_date) - <any>new Date(b.last_date);
    //         });
    //       }); 
    //     }       
        
    //   });
    // }
    
    
  }

  async deleteGroup(id?:string) {
    firebase.database().ref('groups/' + id).remove();
  }

  async deleteGroupParticipants(model: IParticipantChat[], groupId:string) {
    Array.from(model).forEach((elmOfParticipant: IParticipantChat) => {
      var URL = 'users/' + elmOfParticipant.id + '/groups/' + groupId;
      firebase.database().ref('users/').child(elmOfParticipant.id + '/').child('/groups/').child(groupId).remove();
    });

    this.deleteGroup(groupId);
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

  async pushNewMessageToMessages(groupModel:IGroupChat, model?:IMessageChat) {
    firebase.database().ref('groups/').child(groupModel?.key + '/last_message').set(groupModel.last_message);
    firebase.database().ref('groups/').child(groupModel?.key + '/').child("messages").push(model);
  }

  async isGroupExist(model:any ) {
    // firebase.database().ref('groups/').equalTo(model.groupNameAr || model.groupNameEn);
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

        if(model.allowed === null || model.allowed === undefined){
          model.allowed = true;
        }

        firebase.database().ref('groups/' + groupId).set(model);

        // Add Groups To Participant
        Array.from(selectedParticipantsList).forEach((elm: IParticipantChat) => {        
          if(elm.groups){
            elm.groups[groupId] = groupId;    
          }

          const updateGroupToUsersRoom = firebase.database().ref('users/' + elm.id +'/' + 'groups');
          updateGroupToUsersRoom.set(elm.groups);
        });
  }

  async editGroup(selectedParticipantsList:IParticipantChat[] , model:IGroupChat , groupId:any ) {
    this.getAllGroupBId(groupId);
    Array.from(model.participants || []).forEach((elmOfParticipant: IParticipantChat) => {
      var URL = 'users/' + elmOfParticipant.id + '/groups/' + groupId;
      firebase.database().ref('users/').child(elmOfParticipant.id + '/').child('/groups/').child(groupId).remove();
    });
    
    // Edit Participants To Group
      Array.from(selectedParticipantsList).forEach((elm: IParticipantChat) => {
        if(elm.groups === null || elm.groups === undefined || elm.groups.length === 0){
          elm.groups = [];
        }

        this.getAllGroupsByParticipantId(elm.id || '');        

        var isExist = this.allChatGroupsList.some(x => x.key === groupId);
        var isParticipantExist = this.chatGroup?.participants?.some(x => x.id === elm.id);
        if(isExist === false && isParticipantExist === false){
          elm.groups[groupId] = groupId;    
          this.participantModel = {
            id:elm.id,
            gender:elm.gender,
            hoffazId:elm.hoffazId,
            role:elm.role,
            name_ar:elm.name_ar,
            name_en:elm.name_en,
            avatar_url:elm.avatar_url == undefined || null || '' ? '../../../../../assets/images/Profile.svg': elm.avatar_url
          }
          // model.participants?.push(this.participantModel)
          firebase.database().ref('groups/').child(groupId+ '/participants').push(this.participantModel);
          const updateGroupToUsersRoom = firebase.database().ref('users/' + elm.id +'/' + 'groups');
          updateGroupToUsersRoom.set(elm.groups);
        }        
      });
      // this.getAllGroupBId(groupId);
      // model.last_message = this.chatGroup?.last_message;
      // model.last_date = this.chatGroup?.last_date;
      // model.messages = this.chatGroup?.messages;

      // var x = firebase.database().ref('groups/' + groupId).set(model);
      
      
      this.getAllChatGroups();
  }
}
