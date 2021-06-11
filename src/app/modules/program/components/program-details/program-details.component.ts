import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IprogramsModel } from 'src/app/core/interfaces/programs-interfaces/iprograms-model';

@Component({
  selector: 'app-program-details',
  templateUrl: './program-details.component.html',
  styleUrls: ['./program-details.component.scss']
})
export class ProgramDetailsComponent implements OnInit {
  showTap: string = 'USERS';

  programModel : IprogramsModel | undefined;

  constructor(
    public translate: TranslateService) { }

  ngOnInit(): void {
  }

  selectedProgramCallBack(event:IprogramsModel){
    this.programModel = event;
    console.log("programModel ===========>", this.programModel);
  }
}
