import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { RoleManagementService } from 'src/app/core/services/role-management/role-management.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent implements OnInit {
  DataForm!: FormGroup;
  isSubmit: boolean = false;
  @Output() hideform = new EventEmitter<boolean>();
  resultMessage: BaseMessageModel = {};

  constructor(
    private formBuilder: FormBuilder,
    private RoleManagement: RoleManagementService,
    private _alertify: AlertifyService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm() {
    this.DataForm = this.formBuilder.group({
      arRoleName: ['', Validators.required],
      enRoleName: ['', Validators.required],
    });
  }

  get fc() {
    return this.DataForm.controls;
  }

  saveData() {
    this.isSubmit = true;
    if (this.DataForm.invalid) {
      return;
    }
    this.RoleManagement.createRole(this.DataForm.value).subscribe((res) => {
      if (res.isSuccess){
        
      this._alertify.success(res.message || "");
      this.backList();
      }
      else{
        this.resultMessage = {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    },error => {
      this.resultMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    });
  }

  backList() {
    this.hideform?.emit(false);
  }
}
