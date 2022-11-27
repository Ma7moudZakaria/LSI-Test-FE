import { Component, OnInit } from '@angular/core';
import { ReportModel } from 'src/app/core/interfaces/reports/get-reports-model';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ReportService } from 'src/app/core/services/report/report.service';

@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.scss']
})
export class ViewReportComponent implements OnInit {
  reports:  ReportModel[] | undefined;
  resMessage: BaseMessageModel = {};

  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.getReports()
  }

  getReports() {

    this.reportService.getReports().subscribe(res => {
      if (res.isSuccess) {
        this.reports = res.data as ReportModel[];
        console.log("Reports Model", this.reports)
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
