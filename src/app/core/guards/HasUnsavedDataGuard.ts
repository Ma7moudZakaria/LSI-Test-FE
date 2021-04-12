import { Router, CanDeactivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable, Component } from '@angular/core';
import { Observable } from 'rxjs';

// export interface HasUnsavedData {
//     hasUnsavedData(): boolean;
//   }

@Injectable()
export class HasUnsavedDataGuard implements CanActivateChild, CanDeactivate<any>{
    constructor(private router: Router) { }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return true;
    }
    canDeactivate(component: any): boolean {
        // if (component.hasUnsavedData && component.hasUnsavedData())
        if (component.hasUnsavedData)
         {
            // return confirm('Are you sure you want to leave page without save changes');
            return confirm('You have some unsaved form data.Are you sure, you want to leave this page?');
 
        }
        return true;
    }

}





