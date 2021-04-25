import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-teacher-profile',
  templateUrl: './view-teacher-profile.component.html',
  styleUrls: ['./view-teacher-profile.component.scss']
})
export class ViewTeacherProfileComponent implements OnInit {
  listbadges = [1, 2]

  constructor() { }

  ngOnInit(): void {
  }

}
