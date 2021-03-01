import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IResetPassword } from 'src/app/core/interfaces/auth/ireset-password-model';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';
// import { MustMatch } from 'src/app/core/_helper/must-match.validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  hidePassword = true;
  userform = new FormGroup({});
  submitted: boolean | undefined;
  token:any;
  successMessage:any;
  errorMessage:any;

  constructor( 
      private fb: FormBuilder,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private authService: AuthService
      ) { }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.queryParamMap.get('tkn');
    this.userform = this.fb.group({
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      'confirm_password': new FormControl('', Validators.compose([Validators.required])),
    },{ 
    // validator: MustMatch('password', 'confirm_password')
    });
  }

  // password(formGroup: FormGroup) {
  //   const { value: password } = formGroup.get('password');
  //   const { value: confirm_password } = formGroup.get('confirm_password');
  //   return password === confirm_password ? null : { passwordNotMatch: true };
  // }

  onSubmit(value: string) {
    if (this.userform?.valid) {
      var resetPasswordModel : IResetPassword;
      resetPasswordModel = {
        token: this.token,
        password: this.userform.value.password
    }
      this.authService.resetPassword(resetPasswordModel).subscribe(
        (res) => {
          if (res.isSuccess){
            this.successMessage={
              message:"Password reseted successfully",
              type:'success'
            }
            setTimeout(()=>{
              this.router.navigateByUrl('/');
            },3000)
          }
          else {
            this.errorMessage={
              message:"Something went wrong",
              type:'danger'
            }
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
      this.successMessage={
        message:"Please fill missing fields",
        type:'danger'
      }
    }
  }

  get diagnostic() { 
    return JSON.stringify(this.userform?.value); 
  }

}
