import { Component, Input, OnInit } from '@angular/core';
import { ProgramDayTaskEncouragementLetterType } from 'src/app/core/enums/program-day-task-encouragement-letter-type.enum';
import { IProgramDayTaskEncouragementLetter } from 'src/app/core/interfaces/programs-interfaces/program-day-tasks-interfaces/iprogram-day-task-encouragement-letter';

@Component({
  selector: 'app-program-day-task-encouragement-letter',
  templateUrl: './program-day-task-encouragement-letter.component.html',
  styleUrls: ['./program-day-task-encouragement-letter.component.scss']
})
export class ProgramDayTaskEncouragementLetterComponent implements OnInit {
  @Input() viewMode: boolean = false;
  questionTemplate: IProgramDayTaskEncouragementLetter={};
  constructor() { }

  ngOnInit(): void {
  }
  onQuestionTextChange(){
    this.questionTemplate.text ? this.questionTemplate.letterType = ProgramDayTaskEncouragementLetterType.text : null;
  }
  saveVoiceUrl(event: any) {
    this.questionTemplate.voiceUrl = event;
    this.questionTemplate.voiceUrl ? this.questionTemplate.letterType = ProgramDayTaskEncouragementLetterType.voice: null;
  }
}
