
import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as firebase from 'firebase';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { RoleEnum } from 'src/app/core/enums/role-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IGroupChat } from 'src/app/core/interfaces/chat-interfaces/igroup-chat';
import { IParticipantChat } from 'src/app/core/interfaces/chat-interfaces/iparticipant-chat';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ChatResponseModel } from 'src/app/core/ng-model/chat-response-model';
import { Guid } from 'src/app/core/ng-model/generate-guid';
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
  langEnum=LanguageEnum;
  createGroupForm: FormGroup = new FormGroup({});
  refGroups = firebase.database().ref('groups/');
  participantsMessage: BaseMessageModel = {};
  selectedParticipantsList = Array<IParticipantChat>();
  currentUser: IUser | undefined;
  

  constructor(
    private fb: FormBuilder,
    private alertify: AlertifyService , 
    public translate: TranslateService
    ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.selectedParticipantsList = [];
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
        allowed:[true]
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
    var GroupId = Guid.newGuid();
    var last_date = formatDate(new Date(), 'dd-MM-yyyy HH:mm:ss', 'en');

    const room = value;
    if (this.createGroupForm.valid){
      this.createGroupChat = {
        group_name: this.translate.currentLang === LanguageEnum.ar ? this.createGroupForm.value.groupNameAr : this.createGroupForm.value.groupNameEn,
        allowed:this.createGroupForm.value.allowed,
        key:GroupId,
        last_date: last_date || '',
        last_message:"",
        messages: {},
        participants:{}
      };

      this.createGroupChat.participants = { };
      if (this.selectedParticipantsList.length) {
        // Add Admin Of Group
        this.createGroupChat.participants[this.currentUser?.id || ''] = {
          id: this.currentUser?.id , 
          hoffazId:"1", 
          // gender:"Male",
          // key:this.currentUser?.id, 
          role:RoleEnum.SuperAdmin,
          name_ar:this.currentUser?.fullNameAr,
          name_en:this.currentUser?.fullNameEn,
          avatar_url:'../../../../../assets/images/Profile.svg'
        }

         // Add Participants Of Group
        Array.from(this.selectedParticipantsList).forEach((elm: IParticipantChat) => {
          if (this.createGroupChat.participants) {

            this.createGroupChat.participants[elm?.id || ''] = {
              id: elm.id , 
              hoffazId:"1", 
              // gender:elm.gender,
              // key:elm.key, 
              role:elm.role,
              name_ar:elm.name_ar,
              name_en:elm.name_en,
              avatar_url:elm.avatar_url == null ? '../../../../../assets/images/Profile.svg' : elm.avatar_url
            }
          }
        });
      }

      // if (this.createGroupChat.messages) {
      //   this.createGroupChat.messages[Guid.newGuid()] = {
      //     date:"",
      //     sender_id:"",
      //     sender_name:"",
      //     message:message,
      //     message_type:'text'          
      //   };
      // }

      

      this.refGroups.orderByChild('groups').equalTo(room.groupNameAr || room.groupNameEn).once('value', (snapshot: any) => {
        if (snapshot.exists()) {
            this.alertify.error("Group Name Is Already Exist");     
            this.resultMessage = {
              message: "Group Name Is Already Exist",
              type: BaseConstantModel.DANGER_TYPE
            }
        } else {

          // Add Participants To Group
          Array.from(this.selectedParticipantsList).forEach((elm: IParticipantChat) => {
            if(elm.groups === null || elm.groups === undefined || elm.groups.length === 0){
              elm.groups = [];
            }
            elm.groups?.push(this.createGroupChat.key || '');
          });

          const newGroupRoom = firebase.database().ref('groups/' + GroupId).set(this.createGroupChat);
          newGroupRoom.catch((errorMessage) => this.alertify.error(errorMessage));

          // Add Groups To Participant
          Array.from(this.selectedParticipantsList).forEach((elm: IParticipantChat) => {            
            const updateGroupToUsersRoom = firebase.database().ref('users/' + elm.key +'/' + 'groups/');
            updateGroupToUsersRoom.set(elm.groups);
          });

          this.closeCreateGroupOverlayEvent();
          this.alertify.success("Group Added Successfully");  
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
      name_ar:Data.name_ar,
      name_en:Data.name_en,
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