import {Component, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-admin-teacher-basic-info',
  templateUrl: './admin-teacher-basic-info.component.html',
  styleUrls: ['./admin-teacher-basic-info.component.scss']
})
export class AdminTeacherBasicInfoComponent implements OnInit {

  @Output() adminViewOutput:boolean | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
