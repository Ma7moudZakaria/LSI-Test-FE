import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IprogramCreatModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-creat-model';
import { IProgramNotificationDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-notification-details';
import { IprogramUpdateModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-update-model';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';
import { BaseResponseModel } from 'src/app/core/ng-model/base-response-model';
import { ProgramService } from 'src/app/core/services/program-services/program.service';

@Component({
  selector: 'app-add-program',
  templateUrl: './add-program.component.html',
  styleUrls: ['./add-program.component.scss']
})
export class AddProgramComponent implements OnInit {

  showTap: string = 'NOTIFY';
  showAddOverlay: boolean = false;
  // openNotify: boolean = false;
  IProgramNotificationDetails: IProgramNotificationDetails = {}
  constructor() { }

  ngOnInit(): void {


  }


  openNotifyProgram() {
    this.showAddOverlay = true;
  }

  editNotification(event: IProgramNotificationDetails) {
    this.IProgramNotificationDetails = event
    this.showAddOverlay = true;
    console.log(event)
  }



}