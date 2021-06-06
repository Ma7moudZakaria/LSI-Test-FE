import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProgramDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
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
  programDetails : IProgramDetails | undefined;
  resMessage: BaseMessageModel = {};
  programId:string | undefined;

  // @Input() getProgramDetails: IProgramDetailsModel | undefined

  constructor(
    private route: ActivatedRoute,
    private programService: ProgramService) { }

  ngOnInit(): void {
    this.programId = this.route.snapshot.params.id;

    if(this.programId)
        this.getProgramDetails(this.programId);
    // console.log("programId =====>" , programId);

    // if (programId != ''){
    //   this.getProgramDutyDays(programId)
    // }
  }

  getProgramDetails(id: string) {
    this.programService.getProgramDetails(id).subscribe(res => {
      if (res.isSuccess) {
        this.programDetails = res.data as IProgramDetails;

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