import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-teacher-recitation-groups',
  templateUrl: './teacher-recitation-groups.component.html',
  styleUrls: ['./teacher-recitation-groups.component.scss']
})
export class TeacherRecitationGroupsComponent implements OnInit {
  @Output() showAddGroup = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }
  listOfParticipants: any[] = [1, 2, 3, 4, 5, 6, 7, 8]


  filterByText(searchKey: string) {

  }
  addNewGroup() {
    this.showAddGroup.emit(true)
  }
}
