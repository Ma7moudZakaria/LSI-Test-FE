import { Component, Input, OnInit } from '@angular/core';
import { IProgramDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { ProgramBatchesService } from 'src/app/core/services/program-batches-service/program-batches.service';
import { IbatchFillterModel } from '../../../../../../../core/interfaces/program-batches-interfaces/ibatch-fillter-model';
import { IBatchModel } from '../../../../../../../core/interfaces/program-batches-interfaces/ibatch-model';

@Component({
  selector: 'app-prog-batches-details',
  templateUrl: './prog-batches-details.component.html',
  styleUrls: ['./prog-batches-details.component.scss']
})
export class ProgBatchesDetailsComponent implements OnInit {

  @Input() patchId: string | undefined;

  batchFillter: IbatchFillterModel | undefined;
  batchModel: IBatchModel | undefined;

  constructor(public programBatchesService: ProgramBatchesService) { }

  ngOnInit(): void {
  }

  getProgBatchesByProgId() {
    this.batchFillter = {
      id: this.patchId,
      skip: 0,
      take: 9
    }
    this.programBatchesService.getTeachersAandStudentsByBatchId(this.batchFillter).subscribe(res => {
      if (res.isSuccess) {
        this.batchModel = res.data;
        console.log('this.batchModel', this.batchModel);
      }
      else {
      }
    }, error => {

    });
  }
}
