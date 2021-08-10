import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProgramDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';

@Component({
  selector: 'app-prog-batches-list',
  templateUrl: './prog-batches-list.component.html',
  styleUrls: ['./prog-batches-list.component.scss']
})
export class ProgBatchesListComponent implements OnInit {

  @Output() showAddBatchOverlayEvent = new EventEmitter<boolean>();

  @Input() programDetails : IProgramDetails | undefined ;

  constructor() { }

  ngOnInit(): void {
  }

  showAddBatchOverlay(){
    this.showAddBatchOverlayEvent.emit(true);
  }

}
