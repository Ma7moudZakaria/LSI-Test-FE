import { EventEmitter, Output } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { RoleEnum } from 'src/app/core/enums/role-enum.enum';
import { SocialMediaEnum } from 'src/app/core/enums/social-media-enum.enum';
import { IAuthentication } from 'src/app/core/interfaces/auth-interfaces/iauthentication';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IUserSocialRegister } from 'src/app/core/interfaces/auth-interfaces/iuser-social-register';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { RoleManagementService } from 'src/app/core/services/role-management/role-management.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  hidePassword = true;
  userform = new FormGroup({});
  submitted = new Boolean({});
  lookupCollection: ILookupCollection | undefined;
  lkupsKeys: string[] = ['GENDER'];
  resMessage: BaseMessageModel = {};
  currentLang: LanguageEnum | undefined;
  roleEnum = RoleEnum;
  isSubmit = false;
  hide: boolean = true;
  userSocial: SocialUser | undefined;

  userSocialRegister: IUserSocialRegister = {};
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService,
    private lookupService: LookupService,
    private router: Router,
    private authServiceSocial: SocialAuthService,
    private route: ActivatedRoute,
    public roleService: RoleManagementService
  ) { }

  togglePassword() {
    this.hide = !this.hide;
  }

  roleUser(roleType: number) {
    this.router.navigateByUrl('/auth/(baseRouter:register)' + '?type=' + roleType);
  }

  ngOnInit(): void {
    // this.userform = this.fb.group({
    //   'email': new FormControl('', Validators.compose([Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")])),
    //   'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6) , ,Validators.maxLength(50)]))
    // });

    this.userform = this.fb.group({
      email: ["", [Validators.required]],//, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
    });

    this.currentLang = this.translate.currentLang === LanguageEnum.ar ? LanguageEnum.en : LanguageEnum.ar;
  }

  get f() {
    return this.userform.controls;
  }

  getLookups() {
    this.lookupService.getLookupByKey(this.lkupsKeys).subscribe(res => {
      this.lookupCollection = res.data as ILookupCollection;
    })
  }

  onSubmit(value: string) {
    this.isSubmit = true;
    this.resMessage = {};

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
            if (this.roleService.isAdmin()) { this.router.navigateByUrl('/dashboard'); }
            if (this.roleService.isTeacher() && !this.roleService.isAdmin()) { this.router.navigateByUrl('/dashboard/teacher-dashboard'); }
            if (this.roleService.isStudent()) { this.router.navigateByUrl('/dashboard'); }
            this.getLookups();
            this.isSubmit = false;
          }
          else {
            if (res.statusCode == BaseConstantModel.Bad_Request_Status_Code) {
              this.isSubmit = false;
              setTimeout(() => {
                this.router.navigateByUrl('/auth/(baseRouter:activate-code)');
              }, 3000);

              // this.router.navigateByUrl('/activate-code');
            }
            else {
              this.resMessage = {
                message: res.message,
                type: BaseConstantModel.DANGER_TYPE
              }
              this.isSubmit = false;
            }

          }
        },
        error => {
          this.resMessage = {
            message: error,
            type: BaseConstantModel.DANGER_TYPE
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
    this.authServiceSocial.signIn(GoogleLoginProvider.PROVIDER_ID).
      then((res) => {
        this.userSocial = res;
        this.userSocialRegister.socType = SocialMediaEnum.Google;
        this.userSocialRegister.usrSocMail = this.userSocial.email;
        this.userSocialRegister.usrSocName = this.userSocial.name;
        this.userSocialRegister.usrSocId = this.userSocial.id;
        this.authService.socialAuthentication(this.userSocialRegister).subscribe(
          (res) => {
            if (res.isSuccess) {
              localStorage.setItem('user', JSON.stringify(res.data as IUser));
              this.router.navigateByUrl('/dashboard');
              this.isSubmit = false;
            }
            else {
              this.resMessage = {
                message: res.message,
                type: BaseConstantModel.DANGER_TYPE
              }
              this.isSubmit = false;

            }
          }
        );

      },
        error => {
          this.resMessage = {
            message: error,
            type: BaseConstantModel.DANGER_TYPE
          }
        });
  }

  signInWithFB(): void {
    this.authServiceSocial.signIn(FacebookLoginProvider.PROVIDER_ID).
      then((res) => {
        this.userSocial = res;
        this.userSocialRegister.socType = SocialMediaEnum.Facebook;
        this.userSocialRegister.usrSocMail = this.userSocial.email;
        this.userSocialRegister.usrSocName = this.userSocial.name;
        this.userSocialRegister.usrSocId = this.userSocial.id;
        this.authService.socialAuthentication(this.userSocialRegister).subscribe(
          (res) => {
            if (res.isSuccess) {
              localStorage.setItem('user', JSON.stringify(res.data as IUser));
              this.router.navigateByUrl('/dashboard');
              this.isSubmit = false;
            }
            else {

              this.resMessage = {
                message: res.message,
                type: BaseConstantModel.DANGER_TYPE
              }
              this.isSubmit = false;


            }
          }
        );

      },
        error => {
          this.resMessage = {
            message: error,
            type: BaseConstantModel.DANGER_TYPE
          }
        });
  }

  signOut(): void {
    this.authServiceSocial.signOut();
  }
  private signInErrorHandler(err: any) {
  }
  //=========================
}
