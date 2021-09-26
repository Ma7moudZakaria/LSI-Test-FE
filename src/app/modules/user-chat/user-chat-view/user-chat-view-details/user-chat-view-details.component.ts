import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IAttachment } from 'src/app/core/interfaces/attachments-interfaces/iattachment';
import { IFileUpload } from 'src/app/core/interfaces/attachments-interfaces/ifile-upload';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IGroupChat } from 'src/app/core/interfaces/chat-interfaces/igroup-chat';
import { IMessageChat } from 'src/app/core/interfaces/chat-interfaces/imessage-chat';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { Guid } from 'src/app/core/ng-model/generate-guid';
import { AttachmentsService } from 'src/app/core/services/attachments-services/attachments.service';
import { ChatService } from 'src/app/core/services/chat-services/chat.service';

@Component({
  selector: 'app-user-chat-view-details',
  templateUrl: './user-chat-view-details.component.html',
  styleUrls: ['./user-chat-view-details.component.scss']
})
export class UserChatViewDetailsComponent implements OnInit {

  langEnum=LanguageEnum;
  listOfMessagess:IMessageChat[] = [];
  addMessageToChatGroup:IMessageChat | undefined;
  resultMessage: BaseMessageModel = {};
  currentUser: IUser | undefined;
  messageChat:string | undefined;
  messageType:string = "text";
  messageAttachmentURL:string | undefined;
  fileUploadModel: IFileUpload[] = [];
  groupData : IGroupChat | undefined ;
  fileList: IAttachment[] = [];
  attachmentIds: string[] = [];
  
  constructor(public translate: TranslateService , public chatService:ChatService , private modalService: NgbModal , private attachmentService: AttachmentsService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    console.log("groupData?.allowed " , this.groupData )
  }

  addMessageToGroup(message?:string , messageType?:string, event?: any){
    if (event?.key === "Enter" || event === "Enter") {
      this.messageChat = '';
      if(message && message.length > 0){
        var last_date = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en');
        if(this.messageType === 'text'){
          this.addMessageToChatGroup = {
            date:last_date,
            sender_id:this.currentUser?.id,
            sender_name:this.translate.currentLang === LanguageEnum.ar ? this.currentUser?.fullNameAr : this.currentUser?.fullNameEn,
            sender_name_ar:this.currentUser?.fullNameAr,
            sender_name_en:this.currentUser?.fullNameEn,
            message:message,
            message_type:messageType,
            file_name:''
          };
        }
        else{
          this.addMessageToChatGroup = {
            date:last_date,
            sender_id:this.currentUser?.id,
            sender_name:this.translate.currentLang === LanguageEnum.ar ? this.currentUser?.fullNameEn : this.currentUser?.fullNameEn,
            sender_name_ar:this.currentUser?.fullNameAr,
            sender_name_en:this.currentUser?.fullNameEn,
            message:message,
            file_name:this.messageAttachmentURL == null ? '':this.messageAttachmentURL,
            message_type:messageType
          };      
        }
    
        if(this.groupData?.last_message || this.groupData?.last_message == ""){
          this.groupData.last_date = last_date;
          this.groupData.last_message = message;
          console.log("this.groupData.key" , this.groupData.key);
          // this.groupData.key = this.currentUser?.id;
        }   
    
        if(this.groupData?.messages != null){
          this.chatService.pushNewMessageToMessages(this.groupData , this.addMessageToChatGroup);
          this.listOfMessagess.push(this.addMessageToChatGroup);
        }
        else{
          //if chat group messages not created ,,, will create it and push first message on it
          var Value = this.addMessageToChatGroup;
          var map:any = [];
          map[Guid.newGuid()] = Value;
          this.groupData = {
            key:this.groupData?.key,
            group_name: this.groupData?.group_name,
            allowed:this.groupData?.allowed,       
            last_date: this.groupData?.last_date,
            last_message: message,
            messages: this.groupData?.messages == null ? map : this.groupData?.messages,
            participants:this.groupData?.participants
          }
    
          this.chatService.pushLatestMessageToGroups(this.groupData);
        }
      }     
    }    
  }

  getGroupMessages(){
    this.chatService.getGroupMessages(this.groupData || {});

    this.listOfMessagess = this.chatService.allMessagesList || [];
  }

  onFileChange(files: FileList) {
    if (files.length > 0) {
      Array.from(files).forEach(element => {
        var fileUploadObj: IFileUpload = {
          containerNameIndex: 1,
          file: element
        }
        this.fileUploadModel.push(fileUploadObj);
        this.messageChat = element.name;
      });
      this.UploadFiles(this.fileUploadModel);
    }

  }

  UploadFiles(files: any) {
    if (files.length === 0) {
      return;
    }
    this.attachmentService.upload(files).subscribe(
      (res: any) => {
        this.messageAttachmentURL = res.data[0].url || '';
        this.messageType = 'file';
      }, error => {
        console.log(error);
        this.fileUploadModel = [];
        this.resultMessage = {
            message: error,
            type: BaseConstantModel.DANGER_TYPE
          }
      }
    )
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
}
