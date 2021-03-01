import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  changeLanguageUrl = environment.BaseURL + 'Language/set-lang'

  constructor(private http: HttpClient) { }

  changeLanguage(lang:any){
    return this.http.put(this.changeLanguageUrl + '/' + lang, null);
  }
}
