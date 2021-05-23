import { Injectable } from "@angular/core";
import { CanDeactivate} from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { UpdateUserProfileComponent } from "src/app/modules/user/components/update-user-profile/update-user-profile";

@Injectable()
export class UpdateUserProfileHasUnsavedDataGuard {
    constructor(public translate : TranslateService) { }
    
    canDeactivate(component: UpdateUserProfileComponent): boolean {
        if (component.userService.canDecativate) {
            return confirm(this.translate.instant('GENERAL.UNSAVED_CHANGES'))
        }
        return true;
    }
}
