import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IGroupChat } from 'src/app/core/interfaces/chat-interfaces/igroup-chat';
import { ChatService } from 'src/app/core/services/chat-services/chat.service';

@Component({
  selector: 'app-user-group-view',
  templateUrl: './user-group-view.component.html',
  styleUrls: ['./user-group-view.component.scss']
})
export class UserGroupViewComponent implements OnInit {

  @Output() groupDetailsEvent = new EventEmitter<IGroupChat>();
  currentUser: IUser | undefined;
  listOfGroups: IGroupChat[] = [];
  selectedIndex: number = 0;

  constructor(public chatService:ChatService) { }

  ngOnInit(): void {
    this.chatService.allChatGroupsList = [];
    this.listOfGroups = [];
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.chatService.getAllGroupsByParticipantId(this.currentUser.id || '');    
    this.listOfGroups = this.chatService.allChatGroupsList;
    console.log(this.listOfGroups);
  }

  getGroupDetails(event: IGroupChat) {
    this.groupDetailsEvent.emit(event);
  }

  filterByText(searchKey: string) {
    if(searchKey.length > 0){
      this.listOfGroups = this.listOfGroups.filter(x => x.group_name?.includes(searchKey));
    }
    else{
      this.listOfGroups = this.chatService.allChatGroupsList;
    }
  }
}
