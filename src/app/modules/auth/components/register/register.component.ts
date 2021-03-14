import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  routeParams:string | undefined;
  signup = false;
  editProfile = false;
  registrationModel = {};
  registerform : FormGroup  = new FormGroup({});
  hidePassword = true;
  resMessage: BaseMessageModel = {};
  currentLang: LanguageEnum | undefined;

  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.routeParams = this.router.url;
    this.loadUserForm();
    this.currentLang = this.translate.currentLang === LanguageEnum.ar ? LanguageEnum.en : LanguageEnum.ar;
    
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
      localStorage.clear();
      this.registrationModel = {
        uname: this.registerform.value.userName ,
        uemail: this.registerform.value.email,
        ucpass: this.registerform.value.confirmPassword,//""
        upass: this.registerform.value.password
      }

      this.authService.register(this.registrationModel).subscribe(res => {
        if (res.isSuccess) {
          localStorage.setItem('user',JSON.stringify(res.data as IUser))
          this.router.navigateByUrl('/auth/(baseRouter:activate-code)');
          }
          else {
            this.resMessage ={
              message: res.message,
              type: BaseConstantModel.DANGER_TYPE
            }
          }
      })
    }
    else{
      this.resMessage = {
        message: this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_MESSAGE'),
        type: BaseConstantModel.DANGER_TYPE
      }
    }
  }
}
