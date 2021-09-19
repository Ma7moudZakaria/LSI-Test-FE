import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserChatViewComponent } from './user-chat-view/user-chat-view.component';

const routes: Routes = [
  { path: '', component: UserChatViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserChatViewRoutingModule { }
