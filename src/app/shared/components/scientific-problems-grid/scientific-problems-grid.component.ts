import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScientificProblemUsersEnum } from 'src/app/core/enums/scientific-problem-users-enum.enum';
import { IScientificProblem } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem';

@Component({
  selector: 'app-scientific-problems-grid',
  templateUrl: './scientific-problems-grid.component.html',
  styleUrls: ['./scientific-problems-grid.component.scss']
})
export class ScientificProblemsGridComponent implements OnInit {

  @Input() items: IScientificProblem[] = []
  @Input() numberPerRow: number = 3; //default is 3 for student
  @Input() userMode: ScientificProblemUsersEnum = ScientificProblemUsersEnum.Student;
  @Output() filterEvent = new EventEmitter<number>();

  ScientificProblemUsers = ScientificProblemUsersEnum 
  @Input() totalCount: number= 0;
  page = 1
  take = 1;


  constructor() { }

  ngOnInit(): void {
  }

  onPageChange(){
    let skip = (this.page - 1) * this.take; 
    this.filterEvent.emit(skip);
  }

}
