import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IParticipantChat } from 'src/app/core/interfaces/chat-interfaces/iparticipant-chat';

@Component({
  selector: 'app-chat-input-search-list',
  templateUrl: './chat-input-search-list.component.html',
  styleUrls: ['./chat-input-search-list.component.scss']
})
export class ChatInputSearchListComponent implements OnInit {

  @Input() searchList: IParticipantChat[] = [];
  @Output() addSearchItem = new EventEmitter<IParticipantChat>();

  filteredOptions: IParticipantChat[] = [];

  selectedUser: IParticipantChat = {
    name_en:'',
    name_ar:'',
    avatar_url:'',
    id:''
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
    if (this.search != "" && this.selectedUser.id != '' && Object.keys(this.selectedUser).length > 0 && this.selectedUser.constructor === Object) {
      this.addSearchItem.emit(this.selectedUser);
      // to delete form list Options
      let index = this.filteredOptions.indexOf(this.selectedUser);
      this.filteredOptions.splice(index, 1);
      this.search = '';
      this.selectedUser = {
        name_ar:'',
        name_en:'',
        avatar_url:'',
        id:''
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
        ? event.name_en
        : event.name_ar;
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.translate.currentLang === this.langEnum.en ? this.searchList.filter(
      (option) => option.name_en?.toLowerCase().includes(filterValue.toLowerCase())
    ): this.searchList.filter(
      (option) => option.name_ar?.toLowerCase().includes(filterValue.toLowerCase())
    )
  }

}
