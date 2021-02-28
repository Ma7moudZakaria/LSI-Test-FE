import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationModel } from 'src/app/core/interfaces/auth/authentication-model';
import { UserModel } from 'src/app/core/interfaces/auth/user-model';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  msgs: Message[] = [];
  hidePassword = true;
  userform: FormGroup | undefined;
  submitted: boolean | undefined;
  errorMessage: string | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.userform = this.fb.group({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }

  onSubmit(value: string) {
    if (this.userform?.valid) {
      var authModel: AuthenticationModel;
      authModel = {
        userName: this.userform.value.username,
        password: this.userform.value.password
      }     
      this.authService.UserAuthentication(authModel).subscribe(
        (res) => {
        
          if (res.isSuccess){
            localStorage.setItem('user',JSON.stringify(res.data as UserModel))
            this.router.navigateByUrl('/home');
          }
          else this.errorMessage = res.message;
        },
        (error: any) => {
          if (!error.isSuccess) {
            this.errorMessage = "Communication error";
          }
        }
      );
    }
    else{

    }
  }

  get diagnostic() {
   return JSON.stringify(this.userform?.value); 
  }
}
