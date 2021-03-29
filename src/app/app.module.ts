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

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent
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
    MatExpansionModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [TranslateModule, MatRadioModule, MatCheckboxModule],
  entryComponents: [ConfirmModalComponent]
})
export class AppModule { }
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
selector: '[moveNextByMaxLength]'
})
export class MoveNextByMaxLengthDirective {
falgToStart=true;
startElement:any;
constructor(private _el: ElementRef) { }

// @HostListener('window:change', ['$event'])
// change(event: any) {
//   if (event.srcElement.maxLength === event.srcElement.maxLength) {

//     event.preventDefault();

//    let nextControl= event.srcElement.nextElementSibling;
//     // let nextControl: any = event.srcElement.tabIndex+1;
//    // Searching for next similar control to set it focus
//     while (true)
//     {
//         if (nextControl)
        
//         {
//             if (nextControl.type === event.srcElement.type)
//             {
//                 nextControl.focus();
//                 return;
//             }
//             else
//             {
//                // nextControl = nextControl.nextElementSibling;
//                 nextControl= nextControl.parentElement.nextElementSibling;
//             }
//         }
       
//         else
//         {
//             return;
//         }
//     }
// }
// }

@HostListener('keyup', ['$event']) onKeyDown(e: any) {

  if (e.srcElement.maxLength === e.srcElement.value.length) {

      e.preventDefault();
      if(this.falgToStart==true){this.startElement=e.srcElement;this.falgToStart=false;}

      let nextControl: any = e.srcElement.nextElementSibling;
     // Searching for next similar control to set it focus
      while (true)
      {
          if (nextControl)
          {
              if (nextControl.type === e.srcElement.type)
              {
                  nextControl.focus();
                  return;
              }
              else
              {
                  nextControl = nextControl.nextElementSibling;
              }
          }
          else
          {
            this.startElement.focus();
            this.falgToStart=true;
              return;
          }
      }
  }
}

}
    
// console.log(event)
// }
// @HostListener('keyup', ['$event']) onKeyDown(e: any) {
//     if (e.srcElement.maxLength === e.srcElement.value.length) {

//         e.preventDefault();

//         let nextControl: any = e.srcElement.nextElementSibling;
//        // Searching for next similar control to set it focus
//         while (true)
//         {
//             if (nextControl)
//             {
//                 if (nextControl.type === e.srcElement.type)
//                 {
//                     nextControl.focus();
//                     return;
//                 }
//                 else
//                 {
//                     nextControl = nextControl.nextElementSibling;
//                 }
//             }
//             else
//             {
//                 return;
//             }
//         }
//     }
// }

//}
