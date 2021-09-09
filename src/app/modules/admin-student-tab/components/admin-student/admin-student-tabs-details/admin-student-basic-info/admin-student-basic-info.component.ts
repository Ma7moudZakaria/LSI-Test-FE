import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ITeacherStudentViewModel } from 'src/app/core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { StudentDetailsViewComponent } from 'src/app/shared/components/student-details-view/student-details-view.component';

@Component({
  selector: 'app-admin-student-basic-info',
  templateUrl: './admin-student-basic-info.component.html',
  styleUrls: ['./admin-student-basic-info.component.scss']
})
export class AdminStudentBasicInfoComponent implements OnInit {

  @Output() adminViewOutput: boolean | undefined;

  @ViewChild(StudentDetailsViewComponent) studentDetailsViewChild: StudentDetailsViewComponent | undefined;

  @Input() studentIdOutput: ITeacherStudentViewModel | undefined;
  adminView: boolean = true;

  constructor() { }
  ngOnInit(): void {
    this.getBasicDetails()
  }

  getBasicDetails() {
    if (this.studentDetailsViewChild) {
      this.studentDetailsViewChild.resiveUserId = this.studentIdOutput;
      this.studentDetailsViewChild.getStudentProfile();
    }
  }

}
