import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit,OnChanges {

  @Input() listRoles?: any;
  @Input() selectedRoles?: any;
  langEnum = LanguageEnum;
constructor(public translate: TranslateService){}

  ngOnChanges(changes: SimpleChanges): void {
    this.selected(this.listRoles.children)
  }


  ngOnInit(): void {}

  changeValue(event:MatCheckboxChange,role:any){
    let value=event.checked
    this.printArray(role.children,value);
  }

  selected(arr:any){
   if ( this.selectedRoles) {
    this.selectedRoles.forEach((element:any) => {
      for(var i = 0; i < arr.length; i++){
        if(arr[i].children instanceof Array){
          if (element.permId==arr[i].id) {
            arr[i].checked=true;
          }
          this.selected(arr[i].children);
        }else{
            console.log(arr[i].children);
        }
    }
    });
   }
  }

 printArray(arr:any,value:any){
    for(var i = 0; i < arr.length; i++){
        if(arr[i].children instanceof Array){
          arr[i].checked=value;
          this.printArray(arr[i].children,value);
        }else{
            console.log(arr[i].children);
        }
    }
}
}
