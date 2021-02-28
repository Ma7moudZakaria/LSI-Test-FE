import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordModel } from 'src/app/core/interfaces/auth/reset-password-model';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  passwordType = 'password';
  passwordShown = false;
  resetPasswordForm: FormGroup | undefined;
  resetPasswordModel: ResetPasswordModel | undefined;
  token:any;
  successMessage:any;
  constructor(
    private router: Router, private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.resetPasswordFormG();
        this.token = this.activatedRoute.snapshot.queryParamMap.get('tkn');
  }

  togglePassword() {
    if (this.passwordShown) {
        this.passwordType = 'password';
        this.passwordShown = false;
    } else {
        this.passwordType = 'text';
        this.passwordShown = true;
    }
  }

  resetPasswordFormG() {
    this.resetPasswordForm = this.fb.group({
      password: ["",
      Validators.compose([
        Validators.required
      ])],
      retypePassword: ["",Validators.required]
    });
  }

  get f() {
    return this.resetPasswordForm?.controls;
  }

  onApply() {
    if (this.resetPasswordForm?.valid){

      this.resetPasswordModel = {
        token: this.token,
        password: this.f?.password.value
      }
        
      this.authService.ResetPassword(this.resetPasswordModel).subscribe(res => {
        console.log(res);
        if (res.isSuccess){
          this.successMessage={
            message:"Password updated successfully",
            type:'success'
          }
          setTimeout(()=>{
              this.router.navigateByUrl('/auth/login');
            },3000);
          }
        else{
          this.successMessage={
            message:res.message,
            type:'danger'
          }
        }
      });
      // , error => {
      //       this.successMessage={
      //         message:"Error",
      //         type:'danger'
      //       }
      //       console.log(error);      
    }
    else{
      this.successMessage={
        message:"Please, fill inputes",
        type:'danger'
      }
    }
  } 

}
