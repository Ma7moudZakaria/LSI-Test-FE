import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IGroupChat } from 'src/app/core/interfaces/chat-interfaces/igroup-chat';
import { IParticipantChat } from 'src/app/core/interfaces/chat-interfaces/iparticipant-chat';
import { ChatService } from 'src/app/core/services/chat-services/chat.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {
  langEnum=LanguageEnum;
  listOfParticipants:IParticipantChat[] = [];
  allowed:boolean | undefined;
  groupModel:IGroupChat | undefined;

  constructor(public translate: TranslateService, public chatService:ChatService) { }

  ngOnInit(): void {
    // this.listOfParticipants = [];
    // this.listOfParticipants = this.groupModel?.participants;
    // this.allowed = this.groupModel?.allowed === null ? true : this.groupModel?.allowed;
  }

  filterByText(searchKey:string){
    if(searchKey.length > 0){
      this.listOfParticipants = this.listOfParticipants?.filter(x => x.name_ar?.includes(searchKey) || x.name_en?.includes(searchKey));
    }
    else{
      this.listOfParticipants = this.groupModel?.participants || [];
    }
  }
}
