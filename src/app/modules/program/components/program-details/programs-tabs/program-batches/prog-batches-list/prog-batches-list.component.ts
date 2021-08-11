import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { error } from 'protractor';
import { IProgramDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import {ProgramBatchesService} from 'src/app/core/services/program-batches-service/program-batches.service'

@Component({
  selector: 'app-prog-batches-list',
  templateUrl: './prog-batches-list.component.html',
  styleUrls: ['./prog-batches-list.component.scss']
})
export class ProgBatchesListComponent implements OnInit {

  @Output() showAddBatchOverlayEvent = new EventEmitter<boolean>();

  @Input() programDetails : IProgramDetails | undefined ;

  constructor(public translate: TranslateService,
    private programBatchesService: ProgramBatchesService,
    private alertifyService : AlertifyService) { }

  ngOnInit(): void {
  }

  showAddBatchOverlay(){
    this.showAddBatchOverlayEvent.emit(true);
  }

  updateProgBatchesListAfterAdd(){
    this.programDetails && this.programDetails.progBaseInfo && this.programDetails.progBaseInfo.id ?
    this.programBatchesService.getProgBatchesByProgId(this.programDetails?.progBaseInfo?.id).subscribe(res=>{
      if (res.isSuccess && this.programDetails){
        this.programDetails.progBats = res.data
      }
      else{
        this.alertifyService.error(res.message || '');
      }
    },error => {

    }):'';
  }

}
