import { Component, Input, OnInit } from '@angular/core';
import { IProgramSubscriptionDetails } from 'src/app/core/interfaces/teacher-program-subscription-interfaces/iprogram-subscription-details';

@Component({
  selector: 'app-joining-exam-overlay',
  templateUrl: './joining-exam-overlay.component.html',
  styleUrls: ['./joining-exam-overlay.component.scss']
})
export class JoiningExamOverlayComponent implements OnInit {

  @Input() progDetails: IProgramSubscriptionDetails | undefined
  constructor() { }

  ngOnInit(): void {

  }

}
