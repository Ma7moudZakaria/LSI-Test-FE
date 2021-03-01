import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IprogramFilterRequest } from 'src/app/core/interfaces/programs-interfaces/iprogram-filter-request';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { ProgramService } from 'src/app/core/services/program-services/program.service';

@Component({
  selector: 'app-programs-view',
  templateUrl: './programs-view.component.html',
  styleUrls: ['./programs-view.component.scss']
})
export class ProgramsViewComponent implements OnInit {
  //currentWindowWidth?: number;
  // smallScreen: number = 426;
  // valueLang = "nameAr";
  filterErrorMessage:string | undefined;
  ProgramsList: IprogramsModel[] = []; ;
  ProgramFilter: IprogramFilterRequest = {};
  position: string="";
  //msgs: Message[] = [];
  
  constructor(private ProgramService: ProgramService,
    public translate: TranslateService, ) { }

  ngOnInit(): void {


  }
  getPrograms() {
    this.filterErrorMessage = "";

    this.ProgramFilter.PageNumber=10;
    this.ProgramFilter.PageSize=1;
    this.ProgramService.getProgramsFilter(this.ProgramFilter).subscribe(res => {
      let response = <BaseResponseModel>res;
      if (response.isSuccess) {
        this.ProgramsList = response.data;
      }
      else {
        this.ProgramsList = [];
        this.filterErrorMessage = response.message;
      }
    },
      error => {
        console.log(error);
      }
    )
  }
  clearFilter(){
    this.ProgramFilter = {};
    this.ProgramFilter.PageSize =0 ;
    this.ProgramFilter.PageNumber = 10;
    this.getPrograms();
  }

  // confirm(id:string) {
  //   this.confirmationService.confirm({
  //     key: 'account',
  //     message: this.translate.currentLang == 'en-US' ?
  //     'Are You sure to delete the Third-Party Notice?' :"هل انت متاكد انك تريد الاستمرار؟",
  //     header: this.translate.currentLang == 'en-US' ? 'Alert' : "تنبيه",
  //     icon: 'pi pi-exclamation-triangle',
  //     acceptLabel: this.translate.currentLang == 'en-US' ? "Ok" : "موافق",
  //     rejectVisible: false,

  //     accept: () => {
  //       this.ProgramService.deleteProgram(id).subscribe(
  //         res => {

            
  //           this.getPrograms(true);
  //         }, error => {

  //         }
  //       )

  //         this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];


  //     },
  //     reject: () => {

  //       this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
  //       // this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
  //     }
  //   });
  
  // }

  // confirmPosition(position: string) {
  //   this.position = position;

  //   this.confirmationService.confirm({
  //     message: this.translate.currentLang == Languages.English ?'Do you want to delete this record?':'هل تريد حذف هذا السجل؟',
  //     header:this.translate.currentLang == Languages.English ? 'Delete Confirmation':'تأكيد الحذف',
  //     icon: 'pi pi-info-circle',
  //     accept: () => {
  //       this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }];
  //     },
  //     reject: () => {
  //       this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
  //     },
  //     key: "positionDialog"
  //   });
  // }

}
