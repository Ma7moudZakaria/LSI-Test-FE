import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-new-group-teacher-recitation',
  templateUrl: './add-new-group-teacher-recitation.component.html',
  styleUrls: ['./add-new-group-teacher-recitation.component.scss']
})
export class AddNewGroupTeacherRecitationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  listOfParticipants: any[] = [1, 2, 3, 4, 5, 6, 7, 8]


  filterByText(searchKey: string) {

  }

}
