import {Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ITeacherStudentViewModel} from '../../../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import {TeacherDetailsViewComponent} from '../../../../../shared/components/teacher-details-view/teacher-details-view.component';

@Component({
  selector: 'app-admin-teacher-basic-info',
  templateUrl: './admin-teacher-basic-info.component.html',
  styleUrls: ['./admin-teacher-basic-info.component.scss']
})
export class AdminTeacherBasicInfoComponent implements OnInit {

  @Output() adminViewOutput:boolean | undefined;

  @ViewChild(TeacherDetailsViewComponent) teacherDetailsViewChild:TeacherDetailsViewComponent | undefined;

  @Input()  teacherIdOutput:ITeacherStudentViewModel | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  getBasicDetails(){
    if (this.teacherDetailsViewChild){
      this.teacherDetailsViewChild.resiveUserId = this.teacherIdOutput;
      this.teacherDetailsViewChild.getTeacherProfile();
    }
  }

}
