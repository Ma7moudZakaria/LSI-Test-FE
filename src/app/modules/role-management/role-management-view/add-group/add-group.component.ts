import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleManagementService } from 'src/app/core/services/role-management/role-management.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
  DataForm!: FormGroup;
  isSubmit:boolean=false;
  @Output() hideform = new EventEmitter<boolean>();
  constructor(private formBuilder: FormBuilder,private RoleManagement:RoleManagementService) { }

  ngOnInit(): void {
    this.buildForm()
  }
  buildForm() {
    this.DataForm = this.formBuilder.group(
      {
        arRoleName:  ['', Validators.required],
        enRoleName:  ['', Validators.required],
      
      }
    );
  }

  get fc() {
    return this.DataForm.controls;
  }
  saveData(){
    this.isSubmit = true;
    if (this.DataForm.invalid) {
      return;
    }
    this.RoleManagement.createRole(this.DataForm.value).subscribe(res=>{
      this.backList()
    })
  }
  backList(){
    this.hideform?.emit(false)
  }
}
