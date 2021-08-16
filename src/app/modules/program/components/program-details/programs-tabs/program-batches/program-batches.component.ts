import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IProgramDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { ProgBatchesListComponent } from './prog-batches-list/prog-batches-list.component';

@Component({
  selector: 'app-program-batches',
  templateUrl: './program-batches.component.html',
  styleUrls: ['./program-batches.component.scss']
})
export class ProgramBatchesComponent implements OnInit {

  @ViewChild (ProgBatchesListComponent) progBatchListChild : ProgBatchesListComponent | undefined;
  
  @Input() programDetails : IProgramDetails | undefined ;

  showHideAddBatchOverlay:boolean = false;
  

  constructor() { }

  ngOnInit(): void {
  }

  showHideAddBatchOverlayHandler(event : boolean){
    this.showHideAddBatchOverlay = event;
    this.progBatchListChild?.updateProgBatchesListAfterAdd();
  }

}
