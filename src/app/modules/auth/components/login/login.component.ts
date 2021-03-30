import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IAuthentication } from 'src/app/core/interfaces/auth-interfaces/iauthentication';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  hidePassword = true;
  userform = new FormGroup({});
  submitted = new Boolean ({});
  lookupCollection: ILookupCollection | undefined;
  lkupsKeys : string[] = ['GENDER'];
  resMessage: BaseMessageModel = {};
  currentLang: LanguageEnum | undefined;
  isSubmit = false;
  hide: boolean = true;
  user: SocialUser|undefined;
  loggedIn: boolean=false;
  constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private translate: TranslateService,
      private lookupService: LookupService,
      private router: Router,
      private authServiceSocial: SocialAuthService
      ) { }

  togglePassword() {
    this.hide = !this.hide;
  }

  ngOnInit(): void {
    // this.userform = this.fb.group({
    //   'email': new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])),
    //   'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6) , ,Validators.maxLength(50)]))
    // });

    this.userform = this.fb.group({
      email: ["", [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ["", [Validators.required, Validators.minLength(6) , Validators.maxLength(12)]],
    });
    
    this.currentLang = this.translate.currentLang === LanguageEnum.ar ? LanguageEnum.en : LanguageEnum.ar;
//====================authServiceSocial=====================

this.authServiceSocial.authState.subscribe((user) => {
  this.user = user;
  this.loggedIn = (user != null);
});

  }

  get f() {
    return this.userform.controls;
  }

  getLookups(){
    this.lookupService.getLookupByKey(this.lkupsKeys).subscribe(res=>{
      this.lookupCollection = res.data as ILookupCollection;
      console.log(this.lookupCollection);
    })
  }

  onSubmit(value: string) {
    this.isSubmit = true;
    if (this.userform.valid) {
      var authModel: IAuthentication;
      authModel = {
        uname: this.userform.value.email,
        upass: this.userform.value.password
      }
      this.authService.userAuthentication(authModel).subscribe(
        (res) => {
          if (res.isSuccess) {
            localStorage.setItem('user', JSON.stringify(res.data as IUser));
            this.router.navigateByUrl('/dashboard');
            this.getLookups();
            this.isSubmit = false;
          }
          else
          {
            if(res.statusCode==BaseConstantModel.Bad_Request_Status_Code)
            {
              this.isSubmit = false;
              setTimeout(()=>{
                this.router.navigateByUrl('/auth/(baseRouter:activate-code)');
              },3000);
             
              // this.router.navigateByUrl('/activate-code'); 
            }
            else{
              this.resMessage = {
                message: res.message,
                type: BaseConstantModel.DANGER_TYPE
              }
              this.isSubmit = false;
            }
           
          } 
        }
      );
    }
    else {
      this.resMessage = {
        message: this.translate.instant('GENERAL.FORM_INPUT_COMPLETION_MESSAGE'),
        type: BaseConstantModel.DANGER_TYPE
      }
    }
  }

  //===============social==============

  signInWithGoogle(): void {
   this.authServiceSocial.signIn(GoogleLoginProvider.PROVIDER_ID);
    // this.authServiceSocial.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => console.log(x));
  }

  signInWithFB(): void {
    this.authServiceSocial.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authServiceSocial.signOut();
  }

  //=========================
}