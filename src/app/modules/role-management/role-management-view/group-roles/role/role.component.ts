import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  animations: [
    trigger('listRole', [
      transition('* => *', [
        query(
          ':leave',
          [stagger(50, [animate('0.2s', style({ opacity: 0, height: 0 }))])],
          { optional: true }
        ),
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger(50, [animate('0.2s', style({ opacity: 1, height: '*' }))]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class RoleComponent implements OnInit, OnChanges {
  show = false;
  @Input() listRoles?: any;
  @Input() selectedRoles?: any;
  allComplete:boolean=false;
  langEnum = LanguageEnum;
  constructor(public translate: TranslateService) { }

  ngOnChanges(changes: SimpleChanges): void {

    if (this.listRoles?.children.length > 0) {
      this.selected(this.listRoles.children);
    }

  }

  ngOnInit(): void { }

  changeValue(event: MatCheckboxChange, role: any) {
    let value = event.checked;
    this.allComplete=value
    this.printArray(role.children, value);
  }

  restTree(arr: any) {
    if (arr && arr.length > 0) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].children instanceof Array) {
          arr[i].checked = false;
          arr[i].show = false;
          this.selected(arr[i].children);
        } else {
          console.log(arr[i].children);
        }
      }
    }
  }

  selected(arr: any) {
    this.restTree(arr);
    if (this.selectedRoles && this.selectedRoles.length > 0) {
      this.selectedRoles.forEach((element: any) => {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].children instanceof Array) {
            // arr[i].checked=false;
            if (element.permId == arr[i].id) {
              arr[i].checked = true;
              this.allComplete=false
            }
            this.selected(arr[i].children);
          } else {
            console.log(arr[i].children);
          }
        }
      });
    } else {
      this.restTree(arr);
    }
  }

  printArray(arr: any, value: any) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].children instanceof Array) {
        arr[i].checked = value;
        this.printArray(arr[i].children, value);
      } else {
        console.log(arr[i].children);
      }
    }
  }

  getChecked(arr:any){
    let checkedIndeterminate=false
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].children instanceof Array) {
          // arr[i].checked=false;
          if (arr[i].checked ==true) {
            checkedIndeterminate=true
          }
          this.getChecked(arr[i].children);
        } else {
          checkedIndeterminate=false
        }
      }
      return checkedIndeterminate
  
  }

  someChecked(role:any): boolean {
    if (role.children == null) {
      return false;
    }
    return this.getChecked(role.children)&& !this.allComplete;
  }
}
