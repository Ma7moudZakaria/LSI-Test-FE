import { Injectable } from "@angular/core";
import { CanDeactivate, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ViewAllWalkThroughComponent } from "src/app/modules/walkthrough/components/view-all-walk-through/view-all-walk-through";

@Injectable()
export class WalkthroughHasUnsavedDataGuard implements CanDeactivate<any>{
    constructor(private router: Router, public translate : TranslateService) { }
    
    canDeactivate(component: ViewAllWalkThroughComponent): boolean {
        // if (component.walkThroughService.canDecativate) {
        //     return confirm(this.translate.instant('GENERAL.UNSAVED_CHANGES'))
        //     // return confirm('Are you sure you want to leave page without save changes');
        // }
        return true;
    }

}