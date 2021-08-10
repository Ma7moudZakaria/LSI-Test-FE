import { UserModule } from 'src/app/modules/user/user.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from './shared/shared.module';
import { FooterComponent } from './core/layout/footer/footer.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { AuthInterceptor } from './core/interceptors/auth-interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error-interceptors/error.interceptor';
import { MatExpansionModule } from '@angular/material/expansion';
import { ConfirmModalComponent } from './shared/components/confirm-modal/confirm-modal.component';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { MyLoaderComponent } from './shared/components/my-loader/my-loader.component';
import { LoaderService } from './core/services/loader-services/loader.service';
import { LoaderInterceptor } from './core/services/interceptors/loader-interceptor.service';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { AlertifyService } from './core/services/alertify-services/alertify.service';
// import { HasUnsavedDataGuard } from './core/guards/HasUnsavedDataGuard';
import { NgbModule, NgbRating, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CmsHasUnsavedDataGuard } from './core/guards/cms-has-unsaved-data-guard';
import { WalkthroughHasUnsavedDataGuard } from './core/guards/walkthrough-has-unsaved-data-guard';
import { UpdateTeacherProfileHasUnsavedDataGuard } from './core/guards/update-teacher-profile-has-unsaved-data-guard';
import { UpdateUserProfileHasUnsavedDataGuard } from './core/guards/update-user-profile-has-unsaved-data-guard';
import { TeacherQuitTabRequestComponent } from './modules/admin-messaging/components/teacher-program-request-view/teacher-request-details/teacher-quit-request/teacher-quit-tab-request/teacher-quit-tab-request.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    MyLoaderComponent,
    // TeacherQuitTabRequestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NoopAnimationsModule,
    MatRadioModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    SharedModule,
    MatExpansionModule,
    SocialLoginModule,
    Ng2TelInputModule,
    NgbModule,
    NgbRatingModule,
  ],
  providers: [
    CmsHasUnsavedDataGuard,
    WalkthroughHasUnsavedDataGuard,
    UpdateTeacherProfileHasUnsavedDataGuard,
    UpdateUserProfileHasUnsavedDataGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    LoaderService,
    AlertifyService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '870269866675-itennv2jic75v6g773igda4iun5fi75e.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('476016400500617')
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
  exports: [TranslateModule, MatRadioModule, MatCheckboxModule],
  entryComponents: [ConfirmModalComponent]
})
export class AppModule { }



