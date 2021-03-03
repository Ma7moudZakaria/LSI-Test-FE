import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IResetPassword } from 'src/app/core/interfaces/auth/ireset-password-model';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  passwordType = 'password';
  passwordShown = false;
  resetpasswordform = new FormGroup({});
  resetPasswordModel = {} as  IResetPassword;;
  token:any;
  successMessage:any;
  hidePassword = true;
  errorMessage:any;

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
    this.resetpasswordform = this.fb.group({
      password: ["", Validators.compose([Validators.required])],
      confirmPassword: ["",Validators.required]
    });
  }

  get f() {
    return this.resetpasswordform.controls;
  }

  onApply(value:string) {
    if (this.resetpasswordform.valid){

      this.resetPasswordModel = {
        token: this.token,
        password: this.resetpasswordform.value.password,
        confirmPassword: this.resetpasswordform.value.confirmPassword
      }
        
      this.authService.resetPassword(this.resetPasswordModel).subscribe(res => {
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
          this.errorMessage=res.message;
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
