import { Component, OnInit, ViewChild } from '@angular/core';
import { TeacherRecitationGroupSelectedComponent } from './teacher-recitation-group-selected/teacher-recitation-group-selected.component';
import { TeacherRecitationGroupsComponent } from './teacher-recitation-groups/teacher-recitation-groups.component';

@Component({
  selector: 'app-teacher-recitation-wrapper',
  templateUrl: './teacher-recitation-wrapper.component.html',
  styleUrls: ['./teacher-recitation-wrapper.component.scss']
})
export class TeacherRecitationWrapperComponent implements OnInit {

  @ViewChild(TeacherRecitationGroupsComponent) lestTeacherComponent: TeacherRecitationGroupsComponent | undefined;

  @ViewChild(TeacherRecitationGroupSelectedComponent) detailsComponent: TeacherRecitationGroupSelectedComponent | undefined;
  rejectedRequestId: string = '';
  showAddGroupForm: boolean = false;
  showRejectForm: boolean = false;
  showAddStudent: boolean = false;
  constructor() { }
  GroupId: string = '';
  ngOnInit(): void {
  }
  showAddGroup(event: boolean) {
    this.showAddGroupForm = event;
    if (this.lestTeacherComponent) {
      this.lestTeacherComponent.getTeacherViewtGroupExplanation();
    }
  }

  reciveGroupId(event: string) {
    this.GroupId = event;
    if (this.detailsComponent) {
      this.detailsComponent.getDetailsGroupExplanation(this.GroupId);
    }
  }

  reciveRejectedRequestId(event: string) {
    this.rejectedRequestId = event;
    this.showRejectForm = true
  }
  openRejectForm(event: boolean) {
    this.showRejectForm = event;
    if (this.detailsComponent) {
      this.detailsComponent.getDetailsGroupExplanation(this.GroupId);
    }

  }
  openAddStudentForm(event: boolean) {

    this.showAddStudent = event;

  }
  addStudentRequestMethod(event: boolean) {
    this.showAddStudent = event
  }
}
