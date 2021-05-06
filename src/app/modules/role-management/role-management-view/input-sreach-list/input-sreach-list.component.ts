import { Component, Input, OnChanges, OnInit, Output, SimpleChanges,EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import {  UserSreach } from 'src/app/core/interfaces/role-management-interfaces/role-management';

@Component({
  selector: 'app-input-sreach-list',
  templateUrl: './input-sreach-list.component.html',
  styleUrls: ['./input-sreach-list.component.scss']
})
export class InputSreachListComponent implements OnInit,OnChanges {
  @Input() selectedRoleId: string='';
  @Input() UsersNotBelongToRole: UserSreach[]=[];
  @Output() addUserNotBelongToRole = new EventEmitter<{}>();
  filteredOptions: UserSreach[]=[];
  selectedUser:{}={}
  search:string='';
  langEnum = LanguageEnum;
  constructor(public translate: TranslateService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.UsersNotBelongToRole) {
      this.filteredOptions= this.UsersNotBelongToRole 
    }
  }

  ngOnInit(): void {
  
  }
  addUser(){
    this.addUserNotBelongToRole.emit(this.selectedUser)
  }
  searchKey(){
    this.filteredOptions=this._filter(this.search);
  }
  getNameResult(evnet:any){
    this.selectedUser=evnet
    this.search=this.translate.currentLang===this.langEnum.en?evnet.enUsrName:evnet.arUsrName
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.UsersNotBelongToRole.filter(option => option.enUsrName.toLowerCase().indexOf(filterValue) === 0);
  }
}
