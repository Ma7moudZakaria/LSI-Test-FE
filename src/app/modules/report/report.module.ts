import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewReportComponent } from './components/view-report/view-report.component';
import { ReportRoutingModule } from './report-routing.module';

@NgModule({
  declarations: [ViewReportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    MatTooltipModule,
    MatRadioModule, SharedModule,NgbRatingModule

  ], providers: [MatTooltipModule],
  exports: [ViewReportComponent]
})
export class ReportModule { }
