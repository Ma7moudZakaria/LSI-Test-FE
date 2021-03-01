import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { ProgramService } from 'src/app/core/services/program-services/program.service';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.scss']
})
export class ProgramDetailsComponent implements OnInit {
  //valueLang = "nameEn";
  ProgramId:string | undefined;
  programs?: IprogramsModel;
  //currentWindowWidth?: number;
  errorMessage?:string;
  // msgs: Message[] = [];

  constructor(private ProgramService: ProgramService,
    private activeroute: ActivatedRoute, 
    public translate: TranslateService, ) { }

  ngOnInit(): void {

    this.ProgramId = this.activeroute.snapshot.paramMap.get('id') || '';
    // this.currentWindowWidth = window.innerWidth;
  }

  // @HostListener('window:resize')

  // onResize() {
  //   this.currentWindowWidth = window.innerWidth
  // }
  loadQuestionBankCategoryDetails() {
    this.ProgramService.getProgramDetails(this.ProgramId || '').subscribe(
      res => {
        var response = <BaseResponseModel>res;
        if (response.isSuccess) {
          this.programs = response.data;
        }
        else {
          this.errorMessage = response.message;
        }
      }, error => {
        console.log(error);
      })
  }

  // confirmDelete() {
   
  
  //     this.confirmationService.confirm({
  //       key: 'confirm',
  //       message: this.translate.currentLang == 'en-US' ?
  //         'Are You sure to delete the Third-Party Notice?' : "هل انت متاكد انك تريد الاستمرار؟",
  //       header: this.translate.currentLang == 'en-US' ? 'Confirmation' : "تأكيد",
  //       icon: 'pi pi-exclamation-triangle',
  //       acceptButtonStyleClass: "red",
  //       acceptLabel: this.translate.currentLang == 'en-US' ? "Ok" : "موافق",
  //       rejectLabel: this.translate.currentLang == 'en-US' ? "No" : "لا",
  //       accept: () => {
  //         this.ProgramService.deleteProgram(this.ProgramId).subscribe(
  //           res => {


  //             this.router.navigateByUrl('/programs-view/programs-view');

  //           }, error => {

  //           }
  //         )
  //         this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];

  //       },
  //       reject: () => {
  //         this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
  //       }
  //     });
    

  // }

}
