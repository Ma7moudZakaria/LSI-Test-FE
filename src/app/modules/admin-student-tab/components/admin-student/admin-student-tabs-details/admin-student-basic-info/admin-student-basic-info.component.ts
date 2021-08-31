import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-student-basic-info',
  templateUrl: './admin-student-basic-info.component.html',
  styleUrls: ['./admin-student-basic-info.component.scss']
})
export class AdminStudentBasicInfoComponent implements OnInit {

  constructor() { }
  adminView: boolean = true;

  ngOnInit(): void {
  }

}
