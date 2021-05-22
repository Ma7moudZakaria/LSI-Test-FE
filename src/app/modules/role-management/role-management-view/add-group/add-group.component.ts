import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { Role } from 'src/app/core/interfaces/role-management-interfaces/role-management';
import { CreateRoleModel, UsersExceptStudent } from 'src/app/core/interfaces/role-management-interfaces/role-management';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { RoleManagementService } from 'src/app/core/services/role-management/role-management.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent implements OnInit,AfterViewInit,OnChanges {
  DataForm!: FormGroup;
  isSubmit: boolean = false;
  @Output() hideform = new EventEmitter<boolean>();
  @Input() dataEdit: Role = {arRoleName:'',id:'',enRoleName:''};
  listSelectedUser:any=[]
  resultMessage: BaseMessageModel = {};
  usersExceptStudent:UsersExceptStudent[]=[];
  langEnum = LanguageEnum;
  constructor(
    private formBuilder: FormBuilder,
    private RoleManagement: RoleManagementService,
    private _alertify: AlertifyService,
    public translate: TranslateService
  ) { }
  ngAfterViewInit(): void {
    if (this.dataEdit.id!='') {
      this.DataForm.patchValue(this.dataEdit)
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dataEdit&&this.dataEdit.id!='') {
      this.DataForm.patchValue(this.dataEdit)
    }
  }

  ngOnInit(): void {
    this.buildForm();
    this.getUsers()
  }

  // get-users-except-students

  getUsers() {
    this.RoleManagement.getUsersExceptStudents().subscribe(res => { 
      this.usersExceptStudent=res.data;
      // map 
      this.usersExceptStudent.forEach(element => {
        element.enUsrName=element.usrFullNameEn
        element.arUsrName=element.usrFullNameAr
        element.usrAvatarUrl=element.avatarUrl
      });
    }
    )
  }

  addUser(event:any){
    this.listSelectedUser.push(event); 
  }

  delete(event:any){
   let ind= this.listSelectedUser.indexOf(event);
   this.listSelectedUser.splice(ind,1)
  this.usersExceptStudent.push(event)
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

    let createModel : CreateRoleModel = this.DataForm.value;
    
    //statment need to updated based on models as it's recorded as type any
    createModel.usrs = this.listSelectedUser.map((i:any) => ({usrId : i.id}));

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

  EditData(){
    this.isSubmit = true;
    if (this.DataForm.invalid) {
      return;
    }
   if (this.dataEdit.id!='') {
    this.RoleManagement.editRole({roleId:this.dataEdit.id,...this.DataForm.value}).subscribe((res) => {
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

  }

  backList() {
    this.hideform?.emit(false);
  }
}
