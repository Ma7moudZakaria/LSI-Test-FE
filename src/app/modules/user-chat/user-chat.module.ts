import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserChatViewComponent } from './user-chat-view/user-chat-view.component';
import { UserChatViewDetailsComponent } from './user-chat-view/user-chat-view-details/user-chat-view-details.component';
import { UserGroupViewComponent } from './user-chat-view/user-group-view/user-group-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserChatViewRoutingModule } from './user-chat-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [UserChatViewComponent, UserChatViewDetailsComponent, UserGroupViewComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserChatViewRoutingModule,
    TranslateModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    SharedModule,
  ]
})
export class UserChatModule { }
