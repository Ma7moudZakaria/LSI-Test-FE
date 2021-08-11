import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-teacher-program-sub-view',
  templateUrl: './teacher-program-sub-view.component.html',
  styleUrls: ['./teacher-program-sub-view.component.scss']
})
export class TeacherProgramSubViewComponent implements OnInit {

  ShowSubscription :boolean = false;
  showAddReplyOverlay = false;


  showSubscrption( event :boolean){
    this.ShowSubscription = event;
    this.showAddReplyOverlay = !this.showAddReplyOverlay;
  }
  closeOverlay( event :boolean){
    this.ShowSubscription = event;
    this.showAddReplyOverlay = !this.showAddReplyOverlay;
    this.router.navigateByUrl('/dashboard');
  }

  constructor(private router: Router,) { }

  ngOnInit(): void {

  }

}
