import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-recitation-group-selected',
  templateUrl: './teacher-recitation-group-selected.component.html',
  styleUrls: ['./teacher-recitation-group-selected.component.scss']
})
export class TeacherRecitationGroupSelectedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  listOfParticipants: any[] = [1, 2, 3, 4, 5, 6, 7, 8]



}
