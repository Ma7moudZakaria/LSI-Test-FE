import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { UserCard } from 'src/app/core/interfaces/role-management-interfaces/role-management';

@Component({
  selector: 'app-group-users-card',
  templateUrl: './group-users-card.component.html',
  styleUrls: ['./group-users-card.component.scss']
})
export class GroupUsersCardComponent implements OnInit {
  @Input() userData!: UserCard;
  langEnum = LanguageEnum;
  @Output() deleteUser = new EventEmitter<string>();

  constructor(public translate: TranslateService) { }

  ngOnInit(): void { }

  delete(userId: string) {
    this.deleteUser.emit(userId);
  }

}
