import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentGroupsRoutingModule } from './student-groups-routing.module';
import { StudentGroupsViewComponent } from './components/student-groups-view/student-groups-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { StudentGroupGridComponent } from './components/student-group-grid/student-group-grid.component';
import { StudentGroupCardsComponent } from './components/student-group-cards/student-group-cards.component';


@NgModule({
  declarations: [StudentGroupsViewComponent, StudentGroupGridComponent, StudentGroupCardsComponent],
  imports: [
    CommonModule,
    StudentGroupsRoutingModule,
    SharedModule, TranslateModule,

  ]
})
export class StudentGroupsModule { }
