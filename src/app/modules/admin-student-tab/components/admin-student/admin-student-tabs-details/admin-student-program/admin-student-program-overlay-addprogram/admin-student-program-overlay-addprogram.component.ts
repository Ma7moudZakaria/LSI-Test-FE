import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ISharedProgramsResponseModel } from 'src/app/core/interfaces/programs-interfaces/ishared-programs-response-model';
import { IAddStudentToSharedProgramRequestModel } from 'src/app/core/interfaces/student-management-tab-interfaces/iadd-student-to-shared-program-request-model';
import { ITeacherStudentViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { AdminStudentTabService } from 'src/app/core/services/admin-student-tab-services/admin-student-tab.service';
import { ProgramService } from 'src/app/core/services/program-services/program.service';

@Component({
  selector: 'app-admin-student-program-overlay-addprogram',
  templateUrl: './admin-student-program-overlay-addprogram.component.html',
  styleUrls: ['./admin-student-program-overlay-addprogram.component.scss']
})
export class AdminStudentProgramOverlayAddprogramComponent implements OnInit {
  @Output() closeOverlay = new EventEmitter<boolean>();
  @Input() studentIdOutput: ITeacherStudentViewModel | undefined;

  sharedPrograms: ISharedProgramsResponseModel[] | undefined;
  addStudentToSharedProgramRequestModel: IAddStudentToSharedProgramRequestModel = {};
  studentAndProgramModel: ITeacherStudentViewModel | undefined;
  langEnum = LanguageEnum;
  addStudentToSharedForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private adminStudentTabService: AdminStudentTabService, public translate: TranslateService,
    public programService: ProgramService) { }

  ngOnInit(): void {
    this.buildForm();
    this.getAllSharedPrograms();
  }
  get f() {
    return this.addStudentToSharedForm.controls;

  }
  buildForm() {
    this.addStudentToSharedForm = this.fb.group(
      {
        program: ['', [Validators.required]]

      })
  }
  getAllSharedPrograms() {
    this.programService.getSharedPrograms().subscribe(res => {

      if (res.isSuccess) {
        this.sharedPrograms = res.data;
      }
      else {
      }
    },
      error => {
        console.log(error);
      });
  }

  closeForm() {
    this.closeOverlay.emit(false)
  }
  addStudentToSharedProject() {
    this.studentAndProgramModel = this.studentIdOutput;
    this.addStudentToSharedProgramRequestModel.studId = this.studentAndProgramModel?.usrId;
    this.addStudentToSharedProgramRequestModel.batId = this.addStudentToSharedForm.value.program;

    if (this.addStudentToSharedForm.valid) {
      this.adminStudentTabService.addStudentToSharedProgram(this.addStudentToSharedProgramRequestModel || {}).subscribe(res => {

        if (res.isSuccess) {
          this.closeForm();
        }
        else {
        }
      },
        error => {
          console.log(error);
        });
    }
  }
}
