import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as firebase from 'firebase';
import { BaseConstantModel } from './core/ng-model/base-constant-model';
import { LanguageService } from './core/services/language-services/language.service';

const config = {
  apiKey: "AIzaSyBz6L0qamX2o9J8APMJ2QlKF5jDhECicI4",
  authDomain: "LSI.firebaseapp.com",
  databaseURL: "https://LSI-default-rtdb.firebaseio.com",
  projectId: "LSI",
  storageBucket: "LSI.appspot.com",
  messagingSenderId: "870269866675",
  appId: "1:870269866675:web:8eaf3bca7841a83b52d6c6",
  measurementId: "G-CG7X412XTV"
};



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
  
})

export class AppComponent implements OnInit{
  title = 'LSI-app';
  constructor(public translate:TranslateService, 
    private router: Router,
    private langService: LanguageService){
      // firebase.initializeApp(config);
    // // Get a reference to the database service
    // var database = firebase.database();
    }

  ngOnInit(): void {
    this.langService.initLang();

    firebase.initializeApp(config);
  
    // Get a reference to the database service
    var database = firebase.database();
  }

  showHeader(){
    return !BaseConstantModel.NO_HEADER_ROUTES.includes(this.router.url.split('?')[0]) && this.router.url !== '/';
  }
}
