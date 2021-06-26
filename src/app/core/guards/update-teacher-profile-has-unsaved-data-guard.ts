
import { Injectable } from "@angular/core";
import { CanDeactivate} from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { UpdateTeacherProfileComponent } from "src/app/modules/teacher/components/update-teacher-profile/update-teacher-profile.component";

@Injectable()
export class UpdateTeacherProfileHasUnsavedDataGuard implements CanDeactivate<any>{

    constructor(public translate : TranslateService) { }
    
    canDeactivate(component: UpdateTeacherProfileComponent): boolean {
        // if (component.userService.canDecativate) {
        //     return confirm(this.translate.instant('GENERAL.UNSAVED_CHANGES'))
        // }
        return true;
    }
}
