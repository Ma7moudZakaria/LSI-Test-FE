import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  
})
export class AppComponent implements OnInit{
  title = 'huffaz-app';
  constructor(public translate:TranslateService){}

  ngOnInit(): void {
    this.changeLang('en');
  }
  changeLang(lang:any) {
      this.translate.use(lang);    
  }
}
