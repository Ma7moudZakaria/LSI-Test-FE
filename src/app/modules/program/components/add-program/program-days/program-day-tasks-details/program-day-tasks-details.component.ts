import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-program-day-tasks-details',
  templateUrl: './program-day-tasks-details.component.html',
  styleUrls: ['./program-day-tasks-details.component.scss']
})
export class ProgramDayTasksDetailsComponent implements OnInit {
  @Input()programDayTaskId?:any;
  @Input()huffazTaskType?:number;
  constructor() { }

  ngOnInit(): void {
  }
getProgramDayTaskDetails(id?:any,huffazTask?:number){
  this.programDayTaskId=id;
  this.huffazTaskType=huffazTask;
  console.log("this.programDayTaskId:"+this.programDayTaskId+"this.huffazTaskType:"+this.huffazTaskType)
}
}
