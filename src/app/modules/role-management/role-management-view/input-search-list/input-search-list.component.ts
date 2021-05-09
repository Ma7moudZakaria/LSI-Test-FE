import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { UserSearch } from 'src/app/core/interfaces/role-management-interfaces/role-management';

@Component({
  selector: 'app-input-search-list',
  templateUrl: './input-search-list.component.html',
  styleUrls: ['./input-search-list.component.scss'],
})
export class InputSearchListComponent implements OnInit, OnChanges {

  @Input() selectedRoleId: string = '';
  @Input() UsersNotBelongToRole: UserSearch[] = [];
  @Output() addUserNotBelongToRole = new EventEmitter<{}>();

  filteredOptions: UserSearch[] = [];
  selectedUser: {} = {};
  search: string = '';
  langEnum = LanguageEnum;

  constructor(public translate: TranslateService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.UsersNotBelongToRole) {
      this.filteredOptions = this.UsersNotBelongToRole;
    }
  }

  ngOnInit(): void { }

  addUser() {
    this.search=''
    this.addUserNotBelongToRole.emit(this.selectedUser);
  }

  searchKey() {
    this.filteredOptions = this._filter(this.search);
  }

  getNameResult(event: any) {
    this.selectedUser = event;
    this.search =
      this.translate.currentLang === this.langEnum.en
        ? event.enUsrName
        : event.arUsrName;
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.UsersNotBelongToRole.filter(
      (option) => option.enUsrName.toLowerCase().indexOf(filterValue) === 0
    );
  }

}
