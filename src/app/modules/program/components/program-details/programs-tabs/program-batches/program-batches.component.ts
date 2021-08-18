import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ICreateProgBatch } from 'src/app/core/interfaces/program-batches-interfaces/icreate-prog-batch';
import { IProgramBatchesDetails, IProgramDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { ProgBatchesDetailsComponent } from './prog-batches-details/prog-batches-details.component';
import { ProgBatchesListComponent } from './prog-batches-list/prog-batches-list.component';

@Component({
  selector: 'app-program-batches',
  templateUrl: './program-batches.component.html',
  styleUrls: ['./program-batches.component.scss']
})
export class ProgramBatchesComponent implements OnInit {

  @ViewChild(ProgBatchesListComponent) progBatchListChild: ProgBatchesListComponent | undefined;
  @ViewChild(ProgBatchesDetailsComponent) progDeta: ProgBatchesDetailsComponent | undefined;
  @Input() programDetails: IProgramDetails | undefined;
  patchId: string | undefined;

  programBatchDetails: IProgramBatchesDetails | undefined;
  isEdit: boolean | undefined;

  showHideAddBatchOverlay: boolean = false;
  showHideEditBatchOverlay: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  showAddBatchOverlayHandler(event: IProgramBatchesDetails) {
    this.showHideAddBatchOverlay = true;
    this.programBatchDetails = event;
  }
  hideAddBatchOverlayHandler() {
    this.showHideAddBatchOverlay = false;
    this.progBatchListChild?.updateProgBatchesListAfterAdd();
  }

  sendPatchID(event: string) {
    this.patchId = event
    if (this.progDeta) {
      this.progDeta.patchId = event;
      this.progDeta.getProgBatchesByProgId();
    }

  }
  showEditBatchOverlayHandler(event: boolean) {
    this.isEdit = event;
    this.progBatchListChild?.updateProgBatchesListAfterAdd();
  }

  programBatchDetailsHandler(event: IProgramBatchesDetails) {
    this.progBatchListChild?.updateProgBatchesListAfterAdd();
    this.programBatchDetails = event;
  }

}
