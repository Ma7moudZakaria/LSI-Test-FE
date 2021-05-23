import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { RoleEnum } from 'src/app/core/enums/role-enum.enum';
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
  isSubmit = false;
  roleType : string | undefined
  hidePasswordConfirm: boolean = true;
  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public translate: TranslateService) { }

  ngOnInit(): void {
    this.routeParams = this.router.url;
    this.roleType =  this.route.snapshot.queryParamMap.get('type') || '';
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
    // let emailReg = '/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/';
    //"/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/"
    //const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
    this.registerform = this.fb.group({
      email: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      userName: ["", [Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
      password: ["", [Validators.required, Validators.minLength(6) ,Validators.maxLength(12), Validators.pattern(BaseConstantModel.passwordPattern)]],
      confirmPassword: ["", [Validators.required, Validators.minLength(6) ,Validators.maxLength(12),Validators.pattern(BaseConstantModel.passwordPattern)]],
    });
  }

  onSignup(value: string) {
    this.isSubmit = true;
    this.resMessage = {};

    if (this.registerform.valid && this.roleType !== "" && this.roleType !== undefined) {
      localStorage.clear();

      this.registrationModel = {
        uname: this.registerform.value.userName ,
        uemail: this.registerform.value.email,
        ucpass: this.registerform.value.confirmPassword,//""
        upass: this.registerform.value.password,
        roletype: this.roleType
      }

      this.authService.register(this.registrationModel).subscribe(res => {
        if (res.isSuccess) {
          localStorage.setItem('user',JSON.stringify(res.data as IUser))
          this.router.navigateByUrl('/auth/(baseRouter:activate-code)');
          this.isSubmit = false;
          }
          else {
            this.isSubmit = false;
            this.resMessage ={
              message: res.message,
              type: BaseConstantModel.DANGER_TYPE
            }
          }
      },
      error => {
        this.resMessage ={
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
      )
    }
    else{
      this.resMessage = {
        message: this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_MESSAGE'),
        type: BaseConstantModel.DANGER_TYPE
      }
    }
  }

  togglePassword() {
    this.hidePassword  = !this.hidePassword ;
  }
  
  togglePasswordConfirm() {
    this.hidePasswordConfirm  = !this.hidePasswordConfirm ;
  }
}
