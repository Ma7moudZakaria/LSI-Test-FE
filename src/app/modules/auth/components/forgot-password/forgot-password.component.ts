import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IForgotPassword } from 'src/app/core/interfaces/auth-interfaces/iforgot-password';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
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
  resMessage: BaseMessageModel = {};
  currentLang: LanguageEnum | undefined;
  isSubmit = false;

  constructor( 
      private fb: FormBuilder,
      public translate: TranslateService,
      private authService: AuthService
      ) { }

  ngOnInit(): void {
    this.loadForgotPasswordForm();
    this.currentLang = this.translate.currentLang === LanguageEnum.ar ? LanguageEnum.en : LanguageEnum.ar;
  }

  get f() {
    return this.forgetpasswordform.controls;
  }

  loadForgotPasswordForm() {
    this.forgetpasswordform = this.fb.group({
      email: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    });
  }

  onSubmit(value: string) {
    this.isSubmit = true;
    if (this.forgetpasswordform.valid) {
      var forgotPasswordModel : IForgotPassword;
      forgotPasswordModel = {
        email: this.forgetpasswordform.value.email
    }
      this.authService.forgotPassword(forgotPasswordModel).subscribe(
        (res) => {
          if (res.isSuccess){
            this.isSubmit = false;
            this.resMessage = {
              message: res.message,
              type: BaseConstantModel.SUCCESS_TYPE
            }
          }
          else{
            this.isSubmit = false;
            this.resMessage = {
              message: res.message,
              type: BaseConstantModel.DANGER_TYPE
            }
          }
        }
      );
    }
    // else{
    //   this.isSubmit = false;
    //   this.resMessage = {
    //     message: this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_MESSAGE'),
    //     type: BaseConstantModel.DANGER_TYPE
    //   }
    // }
  }
}
