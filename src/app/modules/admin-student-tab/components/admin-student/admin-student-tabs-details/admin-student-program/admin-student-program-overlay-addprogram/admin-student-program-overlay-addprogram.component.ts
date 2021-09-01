import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-student-program-overlay-addprogram',
  templateUrl: './admin-student-program-overlay-addprogram.component.html',
  styleUrls: ['./admin-student-program-overlay-addprogram.component.scss']
})
export class AdminStudentProgramOverlayAddprogramComponent implements OnInit {
  @Output() closeOverlay = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }


  closeForm() {
    this.closeOverlay.emit(false)
  }
}
