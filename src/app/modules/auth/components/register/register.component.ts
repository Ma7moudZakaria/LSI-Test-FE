import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth/iuser-model';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  routeParams:any;
  signup = false;
  editProfile = false;
  registrationModel = {};
  registerform : FormGroup  = new FormGroup({});
  errorMessage:any;
  isSubmit = false;
  successMessage: any;
  hidePassword = true;
  language:any;

  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.routeParams = this.router.url;
    this.loadUserForm();
    this.language = this.language === LanguageEnum.ar ? LanguageEnum.en : LanguageEnum.ar;
    
    if (this.routeParams === '/auth/register') {
      this.signup = true;
      this.editProfile = false;
    } else if (this.routeParams === '/user/edit-profile') {
      this.signup = false;
      this.editProfile = true;
    }
  }

  get f() {
    return this.registerform.controls;
  }

  loadUserForm() {
    this.registerform = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      userName: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    });
  }

  onSignup(value: string) {
    if (this.registerform.valid) {
      this.isSubmit = true;
      this.errorMessage = '';
      localStorage.clear();
      this.registrationModel = {
        uname: this.registerform.value.userName ,
        uemail: this.registerform.value.email,
        ucpass: this.registerform.value.confirmPassword,//""
        upass: this.registerform.value.password
      }

      this.authService.register(this.registrationModel).subscribe(res => {
        this.isSubmit = true;
        if (res.isSuccess) {
          localStorage.setItem('user',JSON.stringify(res.data as IUser))
          this.successMessage = res.message;
          // this.successMessage={
          //   message: res.message,
          //   type:'success'
          // }
          // this.router.navigate(['/auth/activate-code']);
          this.router.navigateByUrl('/auth/(baseRouter:activate-code)');
            setTimeout(()=>{            
              // this.router.navigate(['/home']);
            }, 3000);
          }
          else {
            this.errorMessage = res.message;
          }
      })
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
