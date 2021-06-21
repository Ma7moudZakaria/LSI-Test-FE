import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProgramDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { ProgramDaysComponent } from './program-days/program-days.component';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss']
})
export class AddProgramComponent implements OnInit {

  @ViewChild(ProgramDaysComponent) progDaysCompChild: ProgramDaysComponent | undefined;

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
        this.getProgramDetails();
    // console.log("programId =====>" , programId);

    // if (programId != ''){
    //   this.getProgramDutyDays(programId)
    // }
  }

  getProgramDetails() {
    this.programService.getProgramDetails(this.programId || '').subscribe(res => {
      if (res.isSuccess) {
        this.programDetails = res.data as IProgramDetails;

        if (this.progDaysCompChild && this.progDaysCompChild.progDetails) 
        {
          this.progDaysCompChild.progDetails = this.programDetails;

          if (this.progDaysCompChild?.programDutyDay){
            this.progDaysCompChild.progDutyDayEventCallBk(this.progDaysCompChild?.programDutyDay);
          }
          else if (this.progDaysCompChild.selectedProgDutyDays.length > 0){
            this.progDaysCompChild.programDutyDay = this.progDaysCompChild?.selectedProgDutyDays[this.progDaysCompChild?.selectedProgDutyDays.length - 1];
            this.progDaysCompChild.progDutyDayEventCallBk(this.progDaysCompChild.programDutyDay);
          }

        }
  
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