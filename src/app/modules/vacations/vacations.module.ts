import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VacationsRoutingModule } from './vacations-routing.module';
import { VacationsRequestsViewComponent } from './components/vacations-requests-view/vacations-requests-view.component';
import { StudentProgramListComponent } from './components/vacations-requests-view/student-program-list/student-program-list.component';
import { StudentProgramVacationRequestsComponent } from './components/vacations-requests-view/student-program-vacation-requests/student-program-vacation-requests.component';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../../shared/shared.module';
import { AddStudentProgramVacationRequestComponent } from './components/vacations-requests-view/add-student-program-vacation-request/add-student-program-vacation-request.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [VacationsRequestsViewComponent, StudentProgramListComponent, StudentProgramVacationRequestsComponent, AddStudentProgramVacationRequestComponent],
    imports: [
        CommonModule,
        VacationsRoutingModule,
        TranslateModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class VacationsModule { }
