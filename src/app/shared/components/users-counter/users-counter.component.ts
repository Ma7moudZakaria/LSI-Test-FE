import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-counter',
  templateUrl: './users-counter.component.html',
  styleUrls: ['./users-counter.component.scss']
})
export class UsersCounterComponent implements OnInit {

  constructor() { }
  student: boolean= true;
  teacher: boolean= true;

  ngOnInit(): void {
  }

}
