import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stu-join-request',
  templateUrl: './stu-join-request.component.html',
  styleUrls: ['./stu-join-request.component.scss']
})
export class StuJoinRequestComponent implements OnInit {
  showTap: string = 'new_request';

  constructor() { }

  ngOnInit(): void {
  }

}
