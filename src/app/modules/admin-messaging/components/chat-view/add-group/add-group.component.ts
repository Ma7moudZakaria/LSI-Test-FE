import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as firebase from 'firebase';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IGroupChat } from 'src/app/core/interfaces/chat-interfaces/igroup-chat';
import { IParticipantChat } from 'src/app/core/interfaces/chat-interfaces/iparticipant-chat';
import { SearchItem } from 'src/app/core/interfaces/role-management-interfaces/role-management';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ChatResponseModel } from 'src/app/core/ng-model/chat-response-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
  @Output() closeCreateGroupOverlay = new EventEmitter<IGroupChat>();
  @Input() createGroupChat = {} as IGroupChat;
  resultMessage: BaseMessageModel = {};
  participantsList: IParticipantChat[] = [] ;
  groupsList: string[] = [];
  langEnum=LanguageEnum;
  createGroupForm: FormGroup = new FormGroup({});
  isSubmit = false;
  refGroups = firebase.database().ref('groups/');
  ref = firebase.database().ref('rooms/');
  listSelectedUser: any = [];
  SearchItemList: SearchItem[] = [];
  participantsMessage: BaseMessageModel = {};
  selectedParticipantsList = Array<IParticipantChat>();
  datepipe: DatePipe | undefined;

  constructor(
    private fb: FormBuilder,
    private alertify: AlertifyService , 
    public translate: TranslateService
    ) { }

  ngOnInit(): void {
    this.callFirebaseToGetParticipants();
    this.buildForm();
    
  }

  get f() {
    return this.createGroupForm.controls;
  }

  buildForm() {
    this.createGroupForm = this.fb.group(
      {
        groupNameAr: ['', [Validators.required, Validators.maxLength(256)]],
        groupNameEn: ['', [Validators.required, Validators.maxLength(256)]],
        participants: [],
        allowed:[Boolean]
      }
    )
  }

  callFirebaseToGetParticipants(){
    firebase.database().ref('users/').orderByChild('users').on('value', (resp2: any) => {
      var Data = ChatResponseModel.snapshotToArray(resp2);
      this.getAllParticipants(Data);
      
    });
  }

  getAllParticipants(model:any){
    for(let item in model){
      this.participantsList.push(model[item]);
    }
  }

  createNewGroup(value: any) {
    this.isSubmit = true;
    const room = value;
    if (this.createGroupForm.valid){
      var GroupId = Guid.newGuid();
      var last_date =this.datepipe?.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');

      this.createGroupChat = {
        group_name: this.createGroupForm.value.groupNameAr != null ? this.createGroupForm.value.groupNameAr : this.createGroupForm.value.groupNameEn,
        allowed:this.createGroupForm.value.allowed,
        // group_name: this.createGroupForm.value.firstEn != null ? this.createGroupForm.value.firstEn : this.teacherProfileDetails.faNameEn,
        // group_name:"Huffaz Web",
        key:GroupId,
        last_date: last_date || '',
        // last_message:'',
        messages: {},
        participants:{}
      };

      this.createGroupChat.participants = { };
      if (this.selectedParticipantsList.length) {
        Array.from(this.selectedParticipantsList).forEach((elm: IParticipantChat) => {
          if (this.createGroupChat.participants) {

            this.createGroupChat.participants[elm.id] = {
              id: elm.id , 
              hoffazId:elm.hoffazId, 
              gender:elm.gender,
              key:elm.key, 
              role:elm.role,
              groups:elm.groups
            }
          }
        });
      }

      this.refGroups.orderByChild('groups').equalTo(room.groupNameAr || room.groupNameEn).once('value', (snapshot: any) => {
        if (snapshot.exists()) {
            this.alertify.error("Group Name Is Already Exist");     
            this.resultMessage = {
              message: "Group Name Is Already Exist",
              type: BaseConstantModel.DANGER_TYPE
            }
        } else {

          
          var ListOfGroups: string[] = [];

          Array.from(this.selectedParticipantsList).forEach((elm: IParticipantChat) => {
            elm.groups.push(this.createGroupChat.key || '');
          });

          const newGroupRoom = firebase.database().ref('groups/' + GroupId).set(this.createGroupChat);
          newGroupRoom.catch((errorMessage) => this.alertify.error(errorMessage));

          Array.from(this.selectedParticipantsList).forEach((elm: IParticipantChat) => {
            ListOfGroups = [];
            Array.from(elm.groups).forEach((elmId: string) => {
              ListOfGroups.push(elmId);
            });

            var x = ListOfGroups;
            const updateGroupToUsersRoom = firebase.database().ref('users/' + elm.key +'/' + 'groups/' );
            updateGroupToUsersRoom.set(ListOfGroups);
          });

          this.closeCreateGroupOverlayEvent();
          this.alertify.error("Group Added Successfully");  
        }
      });
    }
  }

  addParticipant() {
    if (!this.createGroupForm.value.participants) {
      this.participantsMessage = {
        message: this.translate.instant('UPDATE_TEACHER_PG.CHOOSE_TEACHER_REWAYAT'),
        type: BaseConstantModel.DANGER_TYPE
      }
      return;
    }
    var Data = this.participantsList.filter(el => el.key == this.createGroupForm.value.participants)[0] as IParticipantChat;
    this.selectedParticipantsList.push({
      id: this.createGroupForm.value.participants , 
      hoffazId:Data.hoffazId, 
      gender:Data.gender,
      key:Data.key, 
      role:Data.role,
      groups:Data.groups
    });
  }

  removeItemFromSelectedParticipant(item: any) {
    let index = this.selectedParticipantsList.indexOf(item);
    this.selectedParticipantsList.splice(index, 1);
  }

  closeCreateGroupOverlayEvent() {
    this.closeCreateGroupOverlay.emit();
  }
}


class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}


// var mapTwo: { [Id: string]: any; } = { };

// mapTwo[IdTwo] = { date: "6-9-2021" , message: "Hello" , message_type: "afb1c85c-c057-4574-9e4c-e6d62d3758a9" , sender_id: "afb1c85c-c057-4574-9e4c-e6d62d3758a9" , sender_name: "Mahmoud"};

// this.createGroupChat = {
//   group_name:"Huffaz Web",
//   last_date:"6-9-2021",
//   last_message:"Welcome Huffaz We On Firebase",
//   messages: map,
//   participants: mapTwo,
//   allowed:true
// }


// this.ref.orderByChild('groups').equalTo(room.roomname).once('value', (snapshot: any) => {
//     if (snapshot.exists()) {
//       // this.snackBar.open('Room name already exist!');
//     } else {
//       const newRoom = firebase.database().ref('groups/' + room.roomname).set(this.createGroupChat);
//       // newRoom.child(room)
//       // newRoom.set(this.groupModel);
//       // this.router.navigate(['/roomlist']);
//     }
//   });