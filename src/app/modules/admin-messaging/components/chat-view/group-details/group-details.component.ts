import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IGroupChat } from 'src/app/core/interfaces/chat-interfaces/igroup-chat';
import { IParticipantChat } from 'src/app/core/interfaces/chat-interfaces/iparticipant-chat';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss']
})
export class GroupDetailsComponent implements OnInit {
  langEnum=LanguageEnum;
  listOfParticipants:IParticipantChat[] = [];
  listOfUsers:IParticipantChat[] = [];
  allowed:boolean = true;
  participantFilter: IParticipantChat = {};
  groupModel:IGroupChat | undefined;

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }

  getGroupDetails(model?:IGroupChat){
    this.listOfParticipants = [];
    this.listOfUsers = [];

    this.groupModel = model;
    console.log("GroupDetails : ",model)
    
    this.listOfParticipants.push(model?.participants || {});
    for(let item in this.listOfParticipants){
      var Data = this.listOfParticipants[item] as any[];
      for(let itemTwo in Data){
        this.listOfUsers.push(Data[itemTwo]);
      }        
    }

    this.allowed = model?.allowed || true;
    console.log("this.listOfUsers : ",this.listOfUsers)
  }

  getParticipants(model?:IParticipantChat){
    if( model?.name_ar &&  model?.name_ar?.length > 0 ){
      this.listOfUsers = this.listOfUsers.filter(x => x.name_ar == model?.name_ar || x.name_en == model?.name_en || x.hoffazId == model?.hoffazId);
    }
    
    if(model?.name_en  && model?.name_en?.length > 0){
      this.listOfUsers = this.listOfUsers.filter(x => x.name_ar == model?.name_ar || x.name_en == model?.name_en || x.hoffazId == model?.hoffazId);
    }

    if(model?.name_ar === "" && model?.name_en === "" && model?.name_ar?.length === 0 && model?.name_en?.length === 0){
      this.listOfParticipants = [];
      this.listOfUsers = [];
      this.listOfParticipants.push(this.groupModel?.participants || {});
      for(let item in this.listOfParticipants){
        var Data = this.listOfParticipants[item] as any[];
        for(let itemTwo in Data){
          this.listOfUsers.push(Data[itemTwo]);
        }        
      }
  
      this.allowed = this.groupModel?.allowed || true;
      console.log("this.allowed : ",this.allowed)
    }
  }

  filterByText(searchKey:string){
    if(this.translate.currentLang === LanguageEnum.ar){
      this.participantFilter.name_ar = searchKey;
    }
    else{
      this.participantFilter.name_en = searchKey;
    }
    
    this.getParticipants(this.participantFilter);
  }
}
