
import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { RoleEnum } from 'src/app/core/enums/role-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IGroupChat } from 'src/app/core/interfaces/chat-interfaces/igroup-chat';
import { IParticipantChat } from 'src/app/core/interfaces/chat-interfaces/iparticipant-chat';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { Guid } from 'src/app/core/ng-model/generate-guid';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { ChatService } from 'src/app/core/services/chat-services/chat.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
  @Output() closeCreateGroupOverlay = new EventEmitter<IGroupChat>();
  @Input() createGroupChat = {} as IGroupChat;
  resultMessage: BaseMessageModel = {};
  langEnum=LanguageEnum;
  createGroupForm: FormGroup = new FormGroup({});
  participantsMessage: BaseMessageModel = {};
  selectedParticipantsList = Array<IParticipantChat>();
  currentUser: IUser | undefined;  

  constructor(
    private fb: FormBuilder,
    private alertify: AlertifyService, 
    public translate: TranslateService,
    public chatService:ChatService
    ) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.selectedParticipantsList = [];
    // this.callFirebaseToGetParticipants();
    this.buildForm();    
    this.chatService.getAllParticipants();
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
        messages: [],
        participants:[]
      };

      this.createGroupChat.participants = [];
      if (this.selectedParticipantsList.length) {
        // Add Admin Of Group
        this.selectedParticipantsList.push({
          id: this.currentUser?.id , 
          hoffazId:"1", 
          role:RoleEnum.SuperAdmin,
          name_ar:this.currentUser?.fullNameAr,
          name_en:this.currentUser?.fullNameEn,
          avatar_url:'../../../../../assets/images/Profile.svg',
          groups: [GroupId],
          gender:"Male"
        });

         // Add Participants Of Group
        Array.from(this.selectedParticipantsList).forEach((elm: IParticipantChat) => {
          if (this.createGroupChat.participants) {
            this.createGroupChat.participants.push({
              id: elm.id , 
              hoffazId:"1", 
              role:elm.role,
              name_ar:elm.name_ar,
              name_en:elm.name_en,
              avatar_url:elm.avatar_url,
              groups: [],
              gender:"Male"
            });
          }
        });
      }

      this.chatService.addGroup(this.selectedParticipantsList, this.createGroupChat, GroupId);
      this.closeCreateGroupOverlayEvent();
      this.alertify.success("Group Added Successfully");  
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
    if (this.selectedParticipantsList.some(x => x.key === this.createGroupForm.value.participants)) {
      return;
    }

    var Data = this.chatService.allParticipantsList.filter(el => el.key == this.createGroupForm.value.participants)[0] as IParticipantChat;
    this.selectedParticipantsList.push({
      id: this.createGroupForm.value.participants , 
      hoffazId:Data.hoffazId, 
      gender:Data.gender,
      name_ar:Data.name_ar,
      name_en:Data.name_en,
      key:Data.key, 
      role:Data.role,
      avatar_url:Data.avatar_url,
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