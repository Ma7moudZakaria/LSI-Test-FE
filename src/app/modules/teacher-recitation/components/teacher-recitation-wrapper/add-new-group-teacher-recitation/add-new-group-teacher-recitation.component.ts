import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IAddGroupExplanationModel } from 'src/app/core/interfaces/calls/iadd-group-explanation-model';
import { ISharedProgramsResponseModel } from 'src/app/core/interfaces/programs-interfaces/ishared-programs-response-model';
import { Role, SearchItem } from 'src/app/core/interfaces/role-management-interfaces/role-management';
import { CreateRoleModel, UsersExceptStudent } from 'src/app/core/interfaces/role-management-interfaces/role-management';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { RoleManagementService } from 'src/app/core/services/role-management/role-management.service';

@Component({
  selector: 'app-add-new-group-teacher-recitation',
  templateUrl: './add-new-group-teacher-recitation.component.html',
  styleUrls: ['./add-new-group-teacher-recitation.component.scss']
})
export class AddNewGroupTeacherRecitationComponent implements OnInit {
  addModel: IAddGroupExplanationModel = {}
  DataForm!: FormGroup;
  isSubmit: boolean = false;
  @Output() hideform = new EventEmitter<boolean>();
  @Input() dataEdit: Role = { arRoleName: '', id: '', enRoleName: '' };
  listSelectedUser: any = []
  resultMessage: BaseMessageModel = {};
  usersExceptStudent: UsersExceptStudent[] = [];
  SearchItemList: SearchItem[] = [];
  langEnum = LanguageEnum;
  sharedPrograms: ISharedProgramsResponseModel[] | undefined;
  allBatches: ISharedProgramsResponseModel[] = [];
  constructor(
    private formBuilder: FormBuilder,
    public programService: ProgramService,
    private RoleManagement: RoleManagementService,
    private _alertify: AlertifyService,
    public translate: TranslateService
  ) { }
  ngAfterViewInit(): void {
    if (this.dataEdit.id != '') {
      this.DataForm.patchValue(this.dataEdit)
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataEdit && this.dataEdit.id != '') {
      this.DataForm.patchValue(this.dataEdit)
    }
  }

  ngOnInit(): void {
    this.buildForm();
    this.getUsers();
    this.getAllBatches()
  }
  // get-all-batch

  getAllBatches() {
    this.programService.getSharedPrograms().subscribe(res => {

      if (res.isSuccess) {
        this.allBatches = res.data;
        // console.log("getAllBatches", this.allBatches)

      }
      else {
      }
    },
      error => {
        console.log(error);
      });
  }
  onChange(event: any) {
    console.log("event.target.value", event.value);
  }
  // get-users-except-students

  getUsers() {
    this.RoleManagement.getUsersExceptStudents().subscribe(res => {
      this.usersExceptStudent = res.data;
      // example for map to can run shared
      this.usersExceptStudent.forEach(element => {
        this.SearchItemList.push(
          {
            enUsrName: element.userName,//element.usrFullNameEn,
            arUsrName: element.userName,
            usrAvatarUrl: element.avatarUrl,
            usrEmail: '',
            usrId: element.id,
            createdOn: element.createdOn
          }
        )
      });
    }
    )
  }

  addUser(event: SearchItem) {
    this.listSelectedUser.push(event);
  }

  delete(event: SearchItem) {
    let ind = this.listSelectedUser.indexOf(event);
    this.listSelectedUser.splice(ind, 1)
    this.SearchItemList.push(event)
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

    let createModel: CreateRoleModel = this.DataForm.value;

    //statment need to updated based on models as it's recorded as type any
    createModel.usrs = this.listSelectedUser.map((i: any) => ({ usrId: i.usrId }));

    this.RoleManagement.createRole(this.DataForm.value).subscribe((res) => {
      if (res.isSuccess) {

        this._alertify.success(res.message || "");
        this.backList();
      }
      else {
        this.resultMessage = {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    }, error => {
      this.resultMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    });
  }

  EditData() {
    this.isSubmit = true;
    if (this.DataForm.invalid) {
      return;
    }
    if (this.dataEdit.id != '') {
      this.RoleManagement.editRole({ roleId: this.dataEdit.id, ...this.DataForm.value }).subscribe((res) => {
        if (res.isSuccess) {

          this._alertify.success(res.message || "");
          this.backList();
        }
        else {
          this.resultMessage = {
            message: res.message,
            type: BaseConstantModel.DANGER_TYPE
          }
        }
      }, error => {
        this.resultMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      });
    }

  }

  backList() {
    this.hideform?.emit(false);
  }
}
