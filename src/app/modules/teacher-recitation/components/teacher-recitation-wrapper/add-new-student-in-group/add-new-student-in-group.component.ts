import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-new-student-in-group',
  templateUrl: './add-new-student-in-group.component.html',
  styleUrls: ['./add-new-student-in-group.component.scss']
})
export class AddNewStudentInGroupComponent implements OnInit {
  @Output() hideform = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }
  saveData() { }
  cancel() {
    this.hideform?.emit(false);

  }
}
