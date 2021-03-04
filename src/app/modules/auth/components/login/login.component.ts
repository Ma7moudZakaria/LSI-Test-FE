import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IAuthentication } from 'src/app/core/interfaces/auth/iauthentication-model';
import { IUser } from 'src/app/core/interfaces/auth/iuser-model';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  hidePassword = true;
  userform = new FormGroup({});
  submitted = new Boolean ({});
  errorMessage:any;
  successMessage:any;

  constructor(
      private fb: FormBuilder,
      private authService: AuthService
      ) { }

  ngOnInit(): void {
    this.userform = this.fb.group({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
    });
  }

  onSubmit(value: string) {
    if (this.userform.valid) {
      var authModel: IAuthentication;
      authModel = {
        uname: this.userform.value.email,
        upass: this.userform.value.password
      }     
      this.authService.userAuthentication(authModel).subscribe(
        (res) => {
          if (res.isSuccess){
            localStorage.setItem('user',JSON.stringify(res.data as IUser))
            this.successMessage={
              message: res.message,
              type:'success'
            }
            setTimeout(()=>{
                // this.router.navigateByUrl('/auth/login');
              },3000);
          }
          else this.errorMessage = res.message;
        },
        (error: any) => {
          if (!error.isSuccess) {
            // this.errorMessage = this.translate.currentLang =='ar' ? "خطأ فى الاتصال" : "Cummunication error"//error.message;
            // this.errorMessage = res.message;
          }
        }
      );
    }
    else{
    }
  }
}