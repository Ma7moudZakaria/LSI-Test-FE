import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IGroupExplanationsStudentViewResponse } from 'src/app/core/interfaces/calls/igroup-explanations-student-view-response';
import { IJoinStudentToGroupRequest } from 'src/app/core/interfaces/calls/ijoin-student-to-group-request';
import { Iuser } from 'src/app/core/interfaces/user-interfaces/iuser';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { CallsService } from 'src/app/core/services/calls-services/calls.service';

@Component({
  selector: 'app-student-group-cards',
  templateUrl: './student-group-cards.component.html',
  styleUrls: ['./student-group-cards.component.scss']
})
export class StudentGroupCardsComponent implements OnInit {
  @Input() item: IGroupExplanationsStudentViewResponse | undefined;
  @Output() reLoadPage = new EventEmitter<any>();

  currentUser: Iuser | undefined;

  langEnum = LanguageEnum;

  constructor(public translate: TranslateService,
    private alertify: AlertifyService,
    private groupExplanationServices: CallsService,
  ) { }


  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user') || '{}') as Iuser;
  }


  joinStudentToGroup() {

    let model: IJoinStudentToGroupRequest = {
      explanationGroupId: this.item?.id,
      studId: this.currentUser?.id
    }
    this.groupExplanationServices.joinStudentToGroup(model).subscribe(res => {
      if (res.isSuccess) {
        this.reLoadPage.emit()
        this.alertify.success(res.message || '');

      }
      else {
        this.alertify.error(res.message || '');

      }
    }, error => {


    })

  }


}
