import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { NgxHijriGregorianDatepickerModule } from 'ngx-hijri-gregorian-datepicker';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReportModule } from '../modules/report/report.module';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule, RouterModule, TranslateModule, Ng2TelInputModule, NgxHijriGregorianDatepickerModule,
    MatButtonModule, MatDialogModule, MatCardModule, MatExpansionModule, MatSelectModule, DragDropModule,
    MatIconModule, FormsModule, MatCheckboxModule, MatRadioModule, MatGridListModule,
    NgbModule, MatAutocompleteModule, NgbRatingModule, MatTooltipModule, PdfViewerModule, MatDatepickerModule, MatNativeDateModule, ReportModule
  ],

    exports: [
        MatRadioModule, MatCheckboxModule, MatButtonModule, MatDialogModule, MatCardModule, Ng2TelInputModule,
        MatExpansionModule, MatSelectModule, DragDropModule,
       MatGridListModule, NgbRatingModule,
        NgbModule, MatTooltipModule, ReportModule, 
        MatDatepickerModule, MatNativeDateModule
    ]
})
export class SharedModule { }
