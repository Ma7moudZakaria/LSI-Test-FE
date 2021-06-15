import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { IExam } from 'src/app/core/interfaces/exam-builder-interfaces/iexam';
import { IQuestion } from 'src/app/core/interfaces/exam-builder-interfaces/iquestion';
import { IProgramDetails, IProgramExamFormsDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';

@Component({
  selector: 'app-join-requests',
  templateUrl: './join-requests.component.html',
  styleUrls: ['./join-requests.component.scss']
})
export class JoinRequestsComponent implements OnInit {

  @Input() programDetails : IProgramDetails | undefined ;
  langEnum = LanguageEnum;
  hearingProgramExamFormsDetails: Array<IQuestion> | undefined ;
  progExamFormsDetails: IExam | undefined ;

  programExamFormsDetails: IProgramExamFormsDetails = {};
  Data = [] as Array<IProgramExamFormsDetails>; 
  degree : number | undefined; 

  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    this.Data = this.programDetails?.progJoiExa == null ?  [] : this.programDetails?.progJoiExa;
    this.getProgramJoinExam(this.Data[0] || {} );
  }

  selectedIndex = 0;
  getProgramJoinExam(programExamFormsDetails?:IProgramExamFormsDetails){
    this.hearingProgramExamFormsDetails= JSON.parse(programExamFormsDetails?.exaTemp ||"{}") as Array<IQuestion> ;

     this.degree = this.hearingProgramExamFormsDetails[0].degree;

    this.progExamFormsDetails = {
      id: programExamFormsDetails?.id,
      no: programExamFormsDetails?.huffno,
      questions:  this.hearingProgramExamFormsDetails == null ? [] :  this.hearingProgramExamFormsDetails,
      arabExamFormNam: programExamFormsDetails?.arExaName,
      engExamFormNam:programExamFormsDetails?.enExaName
    }
  }
}
