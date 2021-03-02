import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';

@Component({
  selector: 'app-tst',
  templateUrl: './tst.component.html',
  styleUrls: ['./tst.component.scss']
})
export class TstComponent implements OnInit {

  constructor(public translate:TranslateService,private auth :AuthService) { }

  ngOnInit(): void {
    console.log(this.translate.currentLang);

    this.translate.use('ar');

    this.auth.changeLanguage('en-Us').subscribe(res => console.log(res));
  }

}
