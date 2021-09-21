import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-recitation-wrapper',
  templateUrl: './teacher-recitation-wrapper.component.html',
  styleUrls: ['./teacher-recitation-wrapper.component.scss']
})
export class TeacherRecitationWrapperComponent implements OnInit {
  showAddGroupForm: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  showAddGroup(event: boolean) {
    this.showAddGroupForm = event
  }
}
