import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-recitation-join-request',
  templateUrl: './teacher-recitation-join-request.component.html',
  styleUrls: ['./teacher-recitation-join-request.component.scss']
})
export class TeacherRecitationJoinRequestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  listOfParticipants: any[] = [1, 2, 3, 4, 5, 6, 7, 8]

}
