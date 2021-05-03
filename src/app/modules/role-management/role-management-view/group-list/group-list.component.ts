import { AfterViewInit, Component, Input, OnInit,EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { Role } from 'src/app/core/interfaces/role-management-interfaces/role-management';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit,OnChanges {
  @Input() listRole!: Role[];
  @Input() selectedRoleId?: string;
  @Output() deleteRole = new EventEmitter<string>();
  @Output() showAddGroup = new EventEmitter<boolean>();
  @Output() filterRole = new EventEmitter<string>();
  @Output() getRoleDetails = new EventEmitter<string>();

  langEnum = LanguageEnum;

  constructor(public translate: TranslateService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.listRole&&this.listRole.length>0) {
      this.getDetails(this.listRole[0].id)
    } 
  }
 


  ngOnInit(): void {
    // console.log("this.listRole",this.listRole);
   
  }
  showAdd(){
    this.showAddGroup?.emit(true)
  }
  loadPrograms(event :string){
    this.filterRole?.emit(event)
  }

  delete(id:string){
    this.deleteRole?.emit(id);
    // console.log('deleteRole');
  }

  getDetails(id:string){
    this.getRoleDetails?.emit(id)
  }
}
