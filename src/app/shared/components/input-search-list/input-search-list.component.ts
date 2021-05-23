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
import { SearchItem } from 'src/app/core/interfaces/role-management-interfaces/role-management';

@Component({
  selector: 'app-input-search-list',
  templateUrl: './input-search-list.component.html',
  styleUrls: ['./input-search-list.component.scss'],
})
export class InputSearchListComponent implements OnInit, OnChanges {


  @Input() searchList: SearchItem[] = [];
  @Output() addSearchItem = new EventEmitter<SearchItem>();

  filteredOptions: SearchItem[] = [];

  selectedUser: SearchItem = {
    arUsrName:'',
    enUsrName:'',
    usrAvatarUrl:'',
    usrEmail:'',
    usrId:"",
  };
  search: string = '';
  langEnum = LanguageEnum;

  constructor(public translate: TranslateService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('UsersNotBelongToRole',this.searchList);
    
    if (changes.searchList) {
      this.filteredOptions = this.searchList;
    }
  }

  ngOnInit(): void { }

  addUser() {
    if (this.search != "" && this.selectedUser.usrId != '' && Object.keys(this.selectedUser).length > 0 && this.selectedUser.constructor === Object) {
      this.addSearchItem.emit(this.selectedUser);
      // to delete form list Options
      let index = this.filteredOptions.indexOf(this.selectedUser);
      this.filteredOptions.splice(index, 1);
      this.search = '';
      this.selectedUser = {
        arUsrName:'',
        enUsrName:'',
        usrAvatarUrl:'',
        usrEmail:'',
        usrId:"",
      };
    }
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
    return this.translate.currentLang === this.langEnum.en ? this.searchList.filter(
      (option) => option.enUsrName.toLowerCase().indexOf(filterValue) === 0
    ): this.searchList.filter(
      (option) => option.arUsrName.toLowerCase().indexOf(filterValue) === 0
    )
  }

}
