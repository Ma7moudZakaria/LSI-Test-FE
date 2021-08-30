import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {BaseConstantModel} from '../../../../core/ng-model/base-constant-model';
import {IProgramDetails} from '../../../../core/interfaces/programs-interfaces/iprogram-details';
import {BasicInformationComponent} from '../../../program/components/program-details/programs-tabs/basic-information/basic-information.component';
import {IprogramsModel} from '../../../../core/interfaces/programs-interfaces/iprograms-model';
import {BaseMessageModel} from '../../../../core/ng-model/base-message-model';
import {ProgramService} from '../../../../core/services/program-services/program.service';

@Component({
  selector: 'app-admin-teacher-tabs-details',
  templateUrl: './admin-teacher-tabs-details.component.html',
  styleUrls: ['./admin-teacher-tabs-details.component.scss']
})
export class AdminTeacherTabsDetailsComponent implements OnInit {

  @Output() refreshProgListEvent = new EventEmitter();
  @ViewChild(BasicInformationComponent) basicInfoCompChild:BasicInformationComponent | undefined;

  @Input() programModel: IprogramsModel | undefined;

  programDetails : IProgramDetails | undefined;
  resMessage: BaseMessageModel = {};
  showTap: string = 'BASEINFO';

  constructor(private progService:ProgramService) { }

  ngOnInit(): void {
    this.getProgramDetails();
  }

  ngOnChanges(){
    this.getProgramDetails();
  }

  getProgramDetails(){
    if (this.programModel && this.programModel.id){
      this.progService.getProgramDetails(this.programModel?.id || '').subscribe(res => {
        if (res.isSuccess) {
          this.programDetails = res.data as IProgramDetails;
          if (this.basicInfoCompChild && this.basicInfoCompChild.basicInfoDetails)
          {
            this.basicInfoCompChild.basicInfoDetails = this.programDetails.progBaseInfo;
          }

          console.log("programTabs ===========>", this.programDetails);
        }
        else {
          this.resMessage =
            {
              message: res.message,
              type: BaseConstantModel.DANGER_TYPE
            }
        }
      }, (error: any) => {
        this.resMessage = {
          message: error,
          type: BaseConstantModel.DANGER_TYPE
        }
      });
    }
  }

  refreshProgList(){
    this.refreshProgListEvent.emit();
  }
}
