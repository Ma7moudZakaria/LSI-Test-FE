import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IprogramCreatModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-creat-model';
import { IprogramUpdateModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-update-model';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { ProgramService } from 'src/app/core/services/program-services/program.service';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss']
})
export class AddProgramComponent implements OnInit {

  //@Input() user: any;
  Title?: string;
  ProgramId:string='';
  Program?: IprogramsModel;
  ProgramCreat: IprogramCreatModel = {};
  ProgramUpdate: IprogramUpdateModel = {} ;
  isAdd:boolean=true;
  //currentWindowWidth?: number;
  errorMessage:string | undefined;
  maxDate: any;
  // msgs: Message[] = [];
  currentForm: FormGroup | undefined;
  successMessage?:string;
  isSubmit = false;


  constructor(
    private ProgramService: ProgramService,
    private activeroute: ActivatedRoute, 
    private router: Router, 
    public translate: TranslateService,
    // private confirmationService: ConfirmationService,
    private fb: FormBuilder)  { }

  ngOnInit(): void {
    if (this.activeroute.snapshot.paramMap.get('id') != null) {
      this.Title = "Edit Program"; // will localize
      this.ProgramId = this.activeroute.snapshot.paramMap.get('id')||'';
      this.isAdd=false;
     this.loadProgramDetails() ;
    } 
    else {
      this.Title = "Add Program";// will localize
      this.isAdd=true;
    }

  }
  /* not used */
  // @HostListener('window:resize')

  // onResize() {
  //   this.currentWindowWidth = window.innerWidth
  // }

  // setMaxDate() {
  //   this.maxDate = new Date().toISOString().split("T")[0];
  // }

  get f() {
    return this.currentForm?.controls;
  }
  buildForm() {

    this.currentForm = this.fb.group(
      {
        catogryName: [50, Validators.required],
      })

  }
  loadProgramDetails() {
    this.ProgramService.getProgramDetails(this.ProgramId).subscribe(
      res => {
        var response =<BaseResponseModel>res;
        if (response.isSuccess) {
          this.Program = response.data;
        }
        else {
          this.errorMessage = response.message;
        }
      }, error => {
        console.log(error);
      })
  }
  PopulateForm() {

  }
  Submit() {
    this.isSubmit = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.ProgramId = ''

    if (this.ProgramId) {    
      this.ProgramService.UpdateProgram(this.ProgramUpdate).subscribe(res => {
        if (res.isSuccess) {
          this.isSubmit = false;
          this.successMessage = res.message;
          setTimeout(() => {
            this.router.navigateByUrl('/program-details/program-details/'+this.ProgramId);
          }, 1500)
        }
        else {
          this.errorMessage = res.message;
        }
        
      },
        error => {
          
        })
    }
    else {
      this.ProgramService.addProgram(this.ProgramCreat).subscribe(res => {
        this.isSubmit = false;
        if (res.isSuccess) {
          this.successMessage = res.message;
          setTimeout(() => {
            this.router.navigateByUrl('/program-details/program-details/'+this.ProgramId);
          }, 1500)
        }
        else {
          this.errorMessage = res.message;
        }
        
      },
        error => {
          
        })
    }
   
 

  }
  // cancelConfirm() {

  //   this.confirmationService.confirm({
  //     key: 'confirm',
  //     message: this.translate.currentLang == 'en-US' ?
  //       'Are you sure that you want to cancel?' : "هل انت متاكد انك تريد الالغاء؟",
  //     header: this.translate.currentLang == 'en-US' ? 'Confirmation' : 'تاكيد',
  //     icon: 'pi pi-exclamation-triangle',
  //     acceptLabel: this.translate.currentLang == 'en-US' ? "Yes" : "نعم",
  //     rejectLabel: this.translate.currentLang == 'en-US' ? "No" : "لا",
  //     accept: () => {
  //       setTimeout(() => {
  //         this.router.navigateByUrl('/programs-view/programs-view');
  //       }, 1500);
  //       this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
  //     },
  //     reject: () => {
  //       this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
  //     }
  //   });
  // }
  // confirm() {
  //   this.confirmationService.confirm({
  //     key: 'account',
  //     message: 'Are you sure that you want to proceed?',
  //     header: 'Confirmation',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
  //     },
  //     reject: () => {
  //       this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
  //     }
  //   });
  // }
  checkPageAvaialbility() {
    // let scopes = this.permissionService.getUserScopes();

  }


}
