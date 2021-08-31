import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-prog-duties',
  templateUrl: './student-prog-duties.component.html',
  styleUrls: ['./student-prog-duties.component.scss']
})
export class StudentProgDutiesComponent implements OnInit {
  GetStudentProgDutiesURL = environment.baseUrl + 'StudentDutyWorkFlow/get-student-program-duty-days/';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}
