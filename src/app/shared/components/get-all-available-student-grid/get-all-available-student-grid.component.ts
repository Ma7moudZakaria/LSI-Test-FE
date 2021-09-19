import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ExportationService } from '../../../core/services/exportation-services/exportation.service';
import { ITeacherStudentViewModel } from '../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { IAvailableTeacher } from 'src/app/core/interfaces/calls/iavailable-teacher';
import { IAvailableTeacherResonse } from 'src/app/core/interfaces/calls/iavailable-teacher-resonse';
import { IAvailableStudentRequest } from 'src/app/core/interfaces/calls/iavailable-student-request';
import { IAvailableStudentResponse } from 'src/app/core/interfaces/calls/iavailable-student-response';

@Component({
  selector: 'app-get-all-available-student-grid',
  templateUrl: './get-all-available-student-grid.component.html',
  styleUrls: ['./get-all-available-student-grid.component.scss']
})
export class GetAllAvailableStudentGridComponent implements OnInit {
  @Input() availableStudentResponseList: IAvailableStudentResponse[] = []
  @Input() numberPerRow: number = 2;
  @Input() totalCount: number = 0;

  @Input() filterAvailableStudent: IAvailableStudentRequest = { skip: 0, take: 9, page: 1 };
  @Output() availableStudentChangePage = new EventEmitter<IAvailableStudentRequest>();
  // @Output() sendStudentVacationId = new EventEmitter<ITeacherStudentViewModel>();
  constructor(public translate: TranslateService,
    private exportationService: ExportationService) { }

  ngOnInit(): void {
    // this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    // this.userRole = this.currentUser.usrRoles?.usrRoles?.[0].enRoleName.toString();

  }

  onPageChange() {
    this.filterAvailableStudent.skip = (this.filterAvailableStudent.page - 1) * (this.filterAvailableStudent.take);
    this.availableStudentChangePage.emit(this.filterAvailableStudent);

  }

}
