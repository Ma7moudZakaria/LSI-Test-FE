
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IActivationCode } from 'src/app/core/interfaces/auth-interfaces/iactivation-code';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss']
})

export class ActivateUserComponent implements OnInit {

  passwordShown = false;
  activationcodeform = new FormGroup({});
  activationcodeModel = {} as  IActivationCode;
  currentUser = {} as IUser;
  hidePassword = true;
  currentLang: LanguageEnum | undefined;
  userData?:string;
  uemail?:string;
  resMessage: BaseMessageModel = {};
  isSubmit = false;

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private translate: TranslateService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.resetPasswordFormG();
    this.currentLang = this.translate.currentLang === LanguageEnum.ar ? LanguageEnum.en : LanguageEnum.ar;
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.uemail = this.currentUser.uemail; 
  }

  resetPasswordFormG() {
    this.activationcodeform = this.fb.group({
      firstNumber: ["", Validators.compose([Validators.required])],
      secondNumber: ["", Validators.compose([Validators.required])],
      thirdNumber: ["", Validators.compose([Validators.required])],
      fourthNumber: ["", Validators.compose([Validators.required])]
    });
  }

  get f() {
    return this.activationcodeform.controls;
  }

  sendActivateCode()
  {
    this.resMessage = {};

    this.authService.sendActivateCode(this.currentUser?.id || '').subscribe(res => {
      console.log(res);
      if (res.isSuccess){
        this.resMessage = 
        {
          message: res.message,
          type: BaseConstantModel.SUCCESS_TYPE
        }
        setTimeout(()=>{
            // this.router.navigateByUrl('/auth/login');
          },3000);
      }
      else{
        this.resMessage = 
        {
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
    }); 
  }

  onApply(value:string) {
    this.isSubmit = true;
    this.resMessage = {};

    if (this.activationcodeform.valid){
      this.activationcodeModel = {
        uid: this.currentUser.id,
        activCode: this.activationcodeform.value.firstNumber.toString() + this.activationcodeform.value.secondNumber.toString() + this.activationcodeform.value.thirdNumber.toString() + this.activationcodeform.value.fourthNumber.toString(),
      }        
      this.authService.activateUser(this.activationcodeModel).subscribe(res => {
        console.log(res);
        if (res.isSuccess){
          this.isSubmit = false;
          this.resMessage = {
            message: res.message,
            type: BaseConstantModel.SUCCESS_TYPE
          }
          this.router.navigateByUrl('/dashboard');
        }
        else{
          this.isSubmit = false;
          this.resMessage = {
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