import { Router, CanDeactivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentManagementSystemViewComponent } from 'src/app/modules/content-management/components/content-management-system-view/content-management-system-view.component';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CmsHasUnsavedDataGuard implements CanDeactivate<any>{
    constructor(private router: Router, public translate : TranslateService) { }
    
    canDeactivate(component: ContentManagementSystemViewComponent): boolean {
        // if (component.contentManagementService.canDecativate) {
        //     return confirm(this.translate.instant('GENERAL.UNSAVED_CHANGES'))
        //     // return confirm('Are you sure you want to leave page without save changes');
        // }
        return true;
    }

}





