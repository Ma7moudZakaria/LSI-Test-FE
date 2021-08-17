import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ICreateProgBatch } from 'src/app/core/interfaces/program-batches-interfaces/icreate-prog-batch';
import { IProgramBatchesDetails, IProgramDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { ProgBatchesListComponent } from './prog-batches-list/prog-batches-list.component';

@Component({
  selector: 'app-program-batches',
  templateUrl: './program-batches.component.html',
  styleUrls: ['./program-batches.component.scss']
})
export class ProgramBatchesComponent implements OnInit {

  @ViewChild (ProgBatchesListComponent) progBatchListChild : ProgBatchesListComponent | undefined;  
  @Input() programDetails : IProgramDetails | undefined ;
  
  programBatchDetails : IProgramBatchesDetails | undefined ;
  isEdit : boolean | undefined ;

  showHideAddBatchOverlay:boolean = false;
  showHideEditBatchOverlay:boolean = false;  
 

  constructor() { }

  ngOnInit(): void {
  }

  showHideAddBatchOverlayHandler(event : boolean){
    this.showHideAddBatchOverlay = event;
    this.progBatchListChild?.updateProgBatchesListAfterAdd();
  }

  showHideEditBatchOverlayHandler(event : boolean){
    this.showHideEditBatchOverlay = event;
    this.progBatchListChild?.updateProgBatchesListAfterAdd();
  }

  showEditBatchOverlayHandler(event : boolean){
    this.isEdit = event;
    this.progBatchListChild?.updateProgBatchesListAfterAdd();
  }

  programBatchDetailsHandler(event : IProgramBatchesDetails){    
    this.progBatchListChild?.updateProgBatchesListAfterAdd();
    this.programBatchDetails = event;
  }

}
