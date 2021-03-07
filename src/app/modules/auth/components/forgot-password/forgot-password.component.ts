import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IForgotPassword } from 'src/app/core/interfaces/auth/iforgot-password';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  hidePassword = true;
  forgetpasswordform = new FormGroup({});
  submitted: boolean | undefined;
  token:any;
  successMessage:any;
  errorMessage:any;
  language:any;

  constructor( 
      private fb: FormBuilder,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private authService: AuthService
      ) { }

  ngOnInit(): void {
    this.loadForgotPasswordForm();
    this.language = this.language === LanguageEnum.ar ? LanguageEnum.en : LanguageEnum.ar;
  }

  loadForgotPasswordForm() {
    this.forgetpasswordform = this.fb.group({
      email: ["", [Validators.required, Validators.email]]
    });
  }

  onSubmit(value: string) {
    if (this.forgetpasswordform.valid) {
      var forgotPasswordModel : IForgotPassword;
      forgotPasswordModel = {
        email: this.forgetpasswordform.value.email
    }
      this.authService.forgotPassword(forgotPasswordModel).subscribe(
        (res) => {
          if (res.isSuccess){
            this.successMessage = res.message;
            // this.successMessage={
            //   message: res.message,
            //   type:'success'
            // }
            setTimeout(()=>{
                // this.router.navigateByUrl('/auth/login');
              },3000);
          }
          else{
            this.errorMessage  = res.message;
          }
        },
        (error: any) => {
          if (!error.isSuccess) {
            // this.errorMessage = this.translate.currentLang =='ar' ? "خطأ فى الاتصال" : "Cummunication error"//error.message;
          }
        }
      );
    }
    else{
      // this.successMessage={
      //   message: this.language == LanguageEnum.en ? "Please Enter A valid Data" : "برجاء إدخال البيانات صحيحة",
      //   type:'danger'
      // }
      this.errorMessage = this.language == LanguageEnum.en ? "Please Enter A valid Data" : "برجاء إدخال البيانات صحيحة";
    }
  }
}
