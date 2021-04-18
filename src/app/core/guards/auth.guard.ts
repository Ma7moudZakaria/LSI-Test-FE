import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Iuser } from '../interfaces/user-interfaces/iuser';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var user= JSON.parse(localStorage.getItem("user") || '{}') as Iuser;
      if(user.token){
        return true;
      }else{
        this.router.navigateByUrl('');
        return false;
      }
  }
  
}
