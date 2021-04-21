import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ViewUserProfileDetailsComponent } from './components/view-user-profile-details/view-user-profile-details';

import { UpdateUserProfileComponent } from './components/update-user-profile/update-user-profile';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [UpdateUserProfileComponent, ViewUserProfileDetailsComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    SharedModule, MatTooltipModule
  ], providers: [MatTooltipModule],
  exports: [ViewUserProfileDetailsComponent]
})
export class UserModule { }
