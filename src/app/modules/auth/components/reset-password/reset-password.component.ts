import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IResetPassword } from 'src/app/core/interfaces/auth-interfaces/ireset-password';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
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
  token:string | undefined;
  hidePassword = true;
  resMessage: BaseMessageModel = {};
  currentLang: LanguageEnum | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder, private translate: TranslateService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.resetPasswordFormG();
    this.currentLang = this.translate.currentLang === LanguageEnum.ar ? LanguageEnum.en : LanguageEnum.ar;
    this.token = this.activatedRoute.snapshot.queryParamMap.get('tkn') || '';
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
          this.resMessage = {
            message: res.message,
            type: BaseConstantModel.SUCCESS_TYPE
          }
        }
        else{
          this.resMessage = {
            message: res.message,
            type: BaseConstantModel.DANGER_TYPE
          }
        }
      });         
    }
    else{
      this.resMessage = {
        message: this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_MESSAGE'),
        type: BaseConstantModel.DANGER_TYPE
      }
    }
  } 
}
