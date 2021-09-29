import { skip, take } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { IAddGroupExplanationModel } from 'src/app/core/interfaces/calls/iadd-group-explanation-model';
import { IUsersInBatchResponse } from 'src/app/core/interfaces/calls/iusers-in-batch-response';
import { IUsersInBatctRequest } from 'src/app/core/interfaces/calls/iusers-in-batct-request';
import { ISharedProgramsResponseModel } from 'src/app/core/interfaces/programs-interfaces/ishared-programs-response-model';
import { Role, SearchItem } from 'src/app/core/interfaces/role-management-interfaces/role-management';
import { IAdminStudentTabFilterRequest } from 'src/app/core/interfaces/student-interfaces/iadmin-student-tab-filter-request';
import { IAdminStudentTabFilterResponse } from 'src/app/core/interfaces/student-interfaces/iadmin-student-tab-filter-response';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AdminStudentTabService } from 'src/app/core/services/admin-student-tab-services/admin-student-tab.service';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { CallsService } from 'src/app/core/services/calls-services/calls.service';
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { RoleManagementService } from 'src/app/core/services/role-management/role-management.service';
import { TeacherRecitationGroupsComponent } from '../teacher-recitation-groups/teacher-recitation-groups.component';

@Component({
  selector: 'app-add-new-group-teacher-recitation',
  templateUrl: './add-new-group-teacher-recitation.component.html',
  styleUrls: ['./add-new-group-teacher-recitation.component.scss']
})
export class AddNewGroupTeacherRecitationComponent implements OnInit {
  @Output() hideform = new EventEmitter<boolean>();
  @Input() dataEdit: Role = { arRoleName: '', id: '', enRoleName: '' };
  @ViewChild(TeacherRecitationGroupsComponent) lestTeacherComponent: TeacherRecitationGroupsComponent | undefined;

  addModel: IAddGroupExplanationModel = {}
  allBatches: ISharedProgramsResponseModel[] = [];
  sharedPrograms: ISharedProgramsResponseModel[] | undefined;
  listStudents: IUsersInBatchResponse[] = []

  DataForm!: FormGroup;
  isSubmit: boolean = false;
  disabledSreach: boolean = false
  disabledBatch: boolean = false
  listSelectedUser: any = []
  resultMessage: BaseMessageModel = {};
  SearchItemList: SearchItem[] = [];
  langEnum = LanguageEnum;

  currentUser: IUser | undefined;
  //
  studentList: IAdminStudentTabFilterResponse[] = [];
  listSelectedStudent: SearchItem[] = []

  studentListFilterRequestModel: IAdminStudentTabFilterRequest = { studName: '' }

  constructor(
    private groupExplanationServices: CallsService,
    private formBuilder: FormBuilder,
    public programService: ProgramService,
    private RoleManagement: RoleManagementService,
    private adminStudentTabService: AdminStudentTabService,
    private _alertify: AlertifyService,
    public translate: TranslateService
  ) { }


  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.getStudentList();
    // this.getAllStudentList()
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

  onChangeBatch(event: any) {
    this.disabledSreach = true
    this.getStudentList();
    // console.log("event.target.value", event.value);
    // let model: IUsersInBatctRequest =
    // {
    //   batId: event.value,
    //   studName: '',
    //   skip: 0,
    //   take: 2147483647
    // }

    // this.groupExplanationServices.getAllUsersInBatct(model).subscribe(res => {
    //   if (res.isSuccess) {
    //     let userslist = res.data as IUsersInBatchResponse[];
    //     // console.log("get users in  Batches", userslist)
    //     userslist.forEach((element: any) => {
    //       if (this.listStudents.length > 0) {
    //         if (!this.listStudents.some(x => x.usrId == element.usrId))
    //           this.listStudents?.push(element)
    //       }
    //       else {
    //         this.listStudents?.push(element);
    //       }
    //     });

    //     // console.log("get users in  Batches", this.listStudents)

    //   }
    //   else {
    //   }
    // },
    //   error => {
    //     console.log(error);
    //   });
  }

  getStudentList() {
    let model: IUsersInBatctRequest =
    {
      batId: this.addModel.batId,
      studName: '',
      skip: 0,
      take: 2147483647
    }
    this.groupExplanationServices.getAllUsersInBatct(model).subscribe(res => {
      if (res.isSuccess) {
        let userslist = res.data as IUsersInBatchResponse[];

        if (this.addModel.batId) {
          this.listSelectedStudent = userslist.map(item => {
            let temp: SearchItem = {
              enUsrName: item?.studNameEn || '',//element.usrFullNameEn,
              arUsrName: item.studNameAr || '',
              usrAvatarUrl: item.avr || '',
              usrEmail: '',
              usrId: item.usrId || '',
              createdOn: ''
            };
            return temp;
          })
        }
        else {
          this.listSelectedStudent = [];
          this.SearchItemList = userslist.map(item => {
            let temp: SearchItem = {
              enUsrName: item?.studNameEn || '',//element.usrFullNameEn,
              arUsrName: item.studNameAr || '',
              usrAvatarUrl: item.avr || '',
              usrEmail: '',
              usrId: item.usrId || '',
              createdOn: ''
            };
            return temp;
          })
        }
        // console.log("get users in  Batches", userslist)
        // userslist.forEach((element: any) => {
        //   if (this.listStudents.length > 0) {
        //     if (!this.listStudents.some(x => x.usrId == element.usrId))
        //       this.listStudents?.push(element)
        //   }
        //   else {
        //     this.listStudents?.push(element);
        //   }
        // });

        // console.log("get users in  Batches", this.listStudents)

      }
      else {
      }
    },
      error => {
        console.log(error);
      });
  }
  removeStuFromList(event: IUsersInBatchResponse) {
    // console.log("removeStuFromList", event)
    let it = this.listStudents.filter(i => i.usrId === event.usrId)[0];
    const ind = this.listStudents?.indexOf(event);
    if (ind > -1) {
      this.listStudents?.splice(ind, 1);
    }
  }

  getAllStudentList() {
    let model: IUsersInBatctRequest =
    {
      batId: '',
      studName: '',
      skip: 0,
      take: 2147483647
    }

    // this.groupExplanationServices.getAllUsersInBatct(model).subscribe(res => {
    //   if (res.isSuccess) {
    //     this.studentList = res.data as IUsersInBatchResponse[];
    //     console.log("studentList", this.studentList)
    //     this.studentList.forEach((element: IUsersInBatchResponse) => {
    //       this.SearchItemList.push(
    //         {
    //           enUsrName: element?.studNameEn || '',//element.usrFullNameEn,
    //           arUsrName: element.studNameAr || '',
    //           usrAvatarUrl: element.avr || '',
    //           usrEmail: '',
    //           usrId: element.usrId || '',
    //           createdOn: ''
    //         }
    //       )
    //     });
    //   }
    //   else {
    //   }
    // },
    //   error => {
    //     console.log(error);
    //   });

    // this.adminStudentTabService.getStudentManagement(this.studentListFilterRequestModel || {}).subscribe(res => {

    //   if (res.isSuccess) {
    //     this.studentList = res.data as IAdminStudentTabFilterResponse[];
    //     console.log("studentList", this.studentList)
    //     this.studentList.forEach(element => {
    //       this.SearchItemList.push(
    //         {
    //           enUsrName: element?.studNameEn || '',//element.usrFullNameEn,
    //           arUsrName: element.studNameAr || '',
    //           usrAvatarUrl: element.avr || '',
    //           usrEmail: '',
    //           usrId: element.usrId || '',
    //           createdOn: ''
    //         }
    //       )
    //     });

    //   }
    //   else {
    //     this._alertify.error(res.message || '');
    //   }
    // },
    //   error => {
    //     console.log(error);
    //   });
  }
  checkNameSpace(str: string) {
    let reg = new RegExp(/^ *$/);
    return str.match(reg) === null;
  }


  addStudentSearch(event: SearchItem) {
    // this.listSelectedUser.push(event);
    this.disabledBatch = true;

    this.listSelectedStudent.push(event);

  }

  deleteStudentSearch(event: SearchItem) {
    // let ind = this.listSelectedUser.indexOf(event);
    // this.listSelectedUser.splice(ind, 1)
    // this.SearchItemList.push(event)
    let ind = this.listSelectedStudent.indexOf(event);
    this.listSelectedStudent.splice(ind, 1)
    this.SearchItemList.push(event)

  }
  sumbitGroupExplanation() {

    let model: IAddGroupExplanationModel =
    {
      techId: this.currentUser?.id,
      groupNameAr: this.addModel.groupNameAr,
      groupNameEn: this.addModel.groupNameEn,
      batId: this.addModel.batId,
      groupMembers: this.listSelectedStudent.map(item => ({ studId: item.usrId })),
    }
    // if (this.listStudents) {
    //   this.listStudents.forEach(e => { model.groupMembers?.push({ studId: e.usrId || '' }) });
    // }
    // if (!this.listSelectedStudent) {
    //   this.SearchItemList.forEach(e => { model.groupMembers?.push({ studId: e.usrId || '' }) });
    // }
    if (model.groupNameAr && model.groupNameEn && model.groupMembers) {
      this.groupExplanationServices.addGroupExplanation(model).subscribe((res) => {
        if (res.isSuccess) {

          this.backList();
          this._alertify.success(res.message || "");

        }
        else {
          this._alertify.error(res.message || "");
        }
      }, error => {

      });
    }
    else {
      this.resultMessage = {
        message: this.translate.currentLang === LanguageEnum.ar ? this.translate.instant('GENERAL.FILDES_REQUIRED') : this.translate.instant('GENERAL.FILDES_REQUIRED'),// this.translate.currentLang === LanguageEnum.en ? "Please complete the missing information" : "برجاء اكمال البيانات",
        type: BaseConstantModel.DANGER_TYPE
      }
    }
  }

  backList() {
    this.hideform?.emit(false);
  }

}
