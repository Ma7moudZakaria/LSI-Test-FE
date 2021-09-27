import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ExportationService } from '../../../core/services/exportation-services/exportation.service';
import { ITeacherStudentViewModel } from '../../../core/interfaces/teacher-drop-out-request-interfaces/Iteacher-student-model';
import { IAvailableTeacher } from 'src/app/core/interfaces/calls/iavailable-teacher';
import { IAvailableTeacherResonse } from 'src/app/core/interfaces/calls/iavailable-teacher-resonse';

@Component({
  selector: 'app-get-all-available-teachers-grid',
  templateUrl: './get-all-available-teachers-grid.component.html',
  styleUrls: ['./get-all-available-teachers-grid.component.scss']
})
export class GetAllAvailableTeachersGridComponent implements OnInit {
  @Output() availableTeachersFilterEvent = new EventEmitter<IAvailableTeacher>();
  @Output() sendStudentVacationId = new EventEmitter<ITeacherStudentViewModel>();
  @Output() teacherCallPhonEvent = new EventEmitter<boolean>();
  @Input() availableTeachersList: IAvailableTeacherResonse[] = []
  @Input() numberPerRow: number = 2;
  @Input() totalCount: number = 0;
  @Input() filterAvailableTeacher: IAvailableTeacher = { skip: 0, take: 9, page: 1 };

  constructor(public translate: TranslateService,
    private exportationService: ExportationService) { }

  ngOnInit(): void {

  }

  onPageChange() {
    this.filterAvailableTeacher.skip = (this.filterAvailableTeacher.page - 1) * (this.filterAvailableTeacher.take);
    this.availableTeachersFilterEvent.emit(this.filterAvailableTeacher);

  }

  teacherCallPhon(){
    this.teacherCallPhonEvent.emit()
  }

}
