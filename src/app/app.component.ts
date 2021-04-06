import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BaseConstantModel } from './core/ng-model/base-constant-model';
import { LanguageService } from './core/services/language-services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  
})
export class AppComponent implements OnInit{
  title = 'huffaz-app';
  constructor(public translate:TranslateService, 
    private router: Router,
    private langService: LanguageService){}

  ngOnInit(): void {
    this.langService.initLang();
  }

  showHeader(){
    return !BaseConstantModel.NO_HEADER_ROUTES.includes(this.router.url.split('?')[0]) && this.router.url !== '/';
  }
}
