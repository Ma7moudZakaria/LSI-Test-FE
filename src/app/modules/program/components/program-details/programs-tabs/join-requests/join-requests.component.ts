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
    console.log("program Exams Details ===========>", this.programDetails);

     this.Data = this.programDetails?.progJoiExa == null ?  [] : this.programDetails?.progJoiExa;

     console.log("Data [0] ===========>", this.Data[0]);
    

    this.getProgramJoinExam(this.Data[0] || {} );

    
    // var x = this.programDetails?.progJoiExa[0]?.exaTemp || null

    // this.hearingProgramExamFormsDetails = JSON.parse( ||"{}");
    // this.degree = 
  }

  selectedIndex = 0;
  getProgramJoinExam(programExamFormsDetails?:IProgramExamFormsDetails){
    console.log("hearingProgramExamFormsDetails ===========>", programExamFormsDetails?.exaTemp);
    this.hearingProgramExamFormsDetails= JSON.parse(programExamFormsDetails?.exaTemp ||"{}") as Array<IQuestion> ;

     this.degree = this.hearingProgramExamFormsDetails[0].degree;

    this.progExamFormsDetails = {
      id: programExamFormsDetails?.id,
      no: programExamFormsDetails?.huffno,
      questions:  this.hearingProgramExamFormsDetails == null ? [] :  this.hearingProgramExamFormsDetails,
      arabExamFormNam: programExamFormsDetails?.arExaName,
      engExamFormNam:programExamFormsDetails?.enExaName
    }

    // this.progExamFormsDetails = {
    //   questionId: this.hearingProgramExamFormsDetails?.questionId,
    //   questionNo: this.hearingProgramExamFormsDetails?.questionNo,
    //   text: this.hearingProgramExamFormsDetails?.text,
    //   voiceUrl: this.hearingProgramExamFormsDetails?.voiceUrl,
    //   title: this.hearingProgramExamFormsDetails?.voiceUrl,
    //   time: this.hearingProgramExamFormsDetails?.time,
    //   degree: this.hearingProgramExamFormsDetails?.degree,
    //   questionType: this.hearingProgramExamFormsDetails?.questionType,
    //   answerType: this.hearingProgramExamFormsDetails?.answerType,
    //   answers : this.hearingProgramExamFormsDetails?.answers == null ? [] : this.hearingProgramExamFormsDetails.answers,
    //   correctAnswersByAnswerNumbers: this.hearingProgramExamFormsDetails?.correctAnswersByAnswerNumbers,
    //   correctAnswersByAnswerNumber: this.hearingProgramExamFormsDetails?.correctAnswersByAnswerNumber
    // }
  }
}
