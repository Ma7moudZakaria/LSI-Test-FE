import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { RoleUsrs } from 'src/app/core/interfaces/role-management-interfaces/role-management';

@Component({
  selector: 'app-group-users-card',
  templateUrl: './group-users-card.component.html',
  styleUrls: ['./group-users-card.component.scss']
})
export class GroupUsersCardComponent implements OnInit {
  @Input() userData: any;
  langEnum = LanguageEnum;
  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
  }
  delete(userId:string){
    console.log('deleteUserId',userId);
    
  }

}
