import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CustomeCardComponent } from './components/custome-card/custome-card.component';
import { MatCardModule } from '@angular/material/card';
import { CustomAccordionComponent } from './components/custom-accordion/custom-accordion.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ViewUserProfileCustomComponent } from './components/view-user-profile-custom/view-user-profile-custom.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SearchInputComponent } from './components/search-input/search-input.component';

import { MatIconModule } from '@angular/material/icon';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { TelInputComponent } from './components/tel-input/tel-input.component';
import { MiladyHijriCalendarComponent } from './components/milady-hijri-calendar/milady-hijri-calendar.component';
import { NgxHijriGregorianDatepickerModule } from 'ngx-hijri-gregorian-datepicker';
import { UsersCounterComponent } from './components/users-counter/users-counter.component';
import { KhatmeenStudentsComponent } from './components/khatmeen-students/khatmeen-students.component';
import { StudentNumbersComponent } from './components/student-numbers/student-numbers.component';
import { StudentsRatingComponent } from './components/students-rating/students-rating.component';
import { RatingModule } from 'ng-starrating';


@NgModule({
    declarations: [ConfirmModalComponent, CustomeCardComponent, CustomAccordionComponent, ViewUserProfileCustomComponent, SearchInputComponent, TelInputComponent, MiladyHijriCalendarComponent, UsersCounterComponent, KhatmeenStudentsComponent, StudentNumbersComponent, StudentsRatingComponent],
  imports: [
    CommonModule, RouterModule, TranslateModule, Ng2TelInputModule, NgxHijriGregorianDatepickerModule,
      MatButtonModule, MatDialogModule, MatCardModule, MatExpansionModule, MatSelectModule, DragDropModule, MatIconModule, RatingModule
  ],
  exports: [
    MatRadioModule, MatCheckboxModule, MatButtonModule, MatDialogModule, MatCardModule, Ng2TelInputModule,
    MatExpansionModule, MatSelectModule, DragDropModule, CustomeCardComponent, CustomAccordionComponent,
      ViewUserProfileCustomComponent, SearchInputComponent, TelInputComponent, MiladyHijriCalendarComponent,
      UsersCounterComponent, KhatmeenStudentsComponent, StudentNumbersComponent
  ]
})
export class SharedModule { }
