import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IProgramDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ProgramService } from 'src/app/core/services/program-services/program.service';
import { BasicInformationComponent } from './basic-information/basic-information.component';


@Component({
  selector: 'app-programs-tabs',
  templateUrl: './programs-tabs.component.html',
  styleUrls: ['./programs-tabs.component.scss']
})
export class ProgramsTabsComponent implements OnInit {

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
      }, error => {
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
