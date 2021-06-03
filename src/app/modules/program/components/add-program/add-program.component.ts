import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProgramDetailsModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-details-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ProgramService } from 'src/app/core/services/program-services/program.service';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss']
})
export class AddProgramComponent implements OnInit {

  showTap: string = 'BASEINFO';
  programDetails = {} as IProgramDetailsModel;
  resMessage: BaseMessageModel = {};

  // @Input() getProgramDetails: IProgramDetailsModel | undefined

  constructor( 
    private route: ActivatedRoute,
    private programService: ProgramService) { }

  ngOnInit(): void {
    var programId = this.route.snapshot.queryParams['id'] || '';

    this.getProgramDetails("2E7F00FB-C02F-4351-B7D6-01B94B796B61")
    // console.log("programId =====>" , programId);

    // if (programId != ''){
    //   this.getProgramDutyDays(programId)
    // }
  }

  getProgramDetails(id: string) {
    this.programService.getProgramDetails(id).subscribe(res => {
      if (res.isSuccess) {
        this.programDetails = res.data as IProgramDetailsModel;

        console.log("programDetails ===========>", this.programDetails);
      }
      else {
        this.resMessage =
        {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    }, error => {
      this.resMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    });
  }

  
}