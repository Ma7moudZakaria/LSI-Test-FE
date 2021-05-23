import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-hijri';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogModel, ConfirmModalComponent } from 'src/app/shared/components/confirm-modal/confirm-modal.component';
import { IDragDropAccordionItems } from 'src/app/core/interfaces/shared-interfaces/accordion-interfaces/idrag-drop-accordion-items';
import { ITelInputParams } from 'src/app/core/interfaces/shared-interfaces/tel-input-interfaces/itel-input-params';
import { IExam } from 'src/app/core/interfaces/exam-builder-interfaces/iexam';
import { IQuestion } from 'src/app/core/interfaces/exam-builder-interfaces/iquestion';
import { DomSanitizer } from '@angular/platform-browser';
import { AttachmentsService } from 'src/app/core/services/attachments-services/attachments.service';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { IScientificProblem } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem';
import { ScientificProblemUsersEnum } from 'src/app/core/enums/scientific-problem-users-enum.enum';

export interface DragDropListItem {
  id: string;
  title: string;

  // description: string;
}
@Component({
  selector: 'app-shared-material',
  templateUrl: './shared-material.component.html',
  styleUrls: ['./shared-material.component.scss']
})
export class SharedMaterialComponent implements OnInit {

  hijri: boolean = false;
  milady: boolean = false;
  dataPinding: any;
  higriPinding: any;
  MiladyPinding: any;
  exam: IExam = { questions: [] };
  submitExam: boolean = false;
  examJson: string | undefined;

  checked: boolean = false;
  indeterminate: boolean = false;
  // labelPosition: 'before' | 'after' = 'after';
  disabled: boolean = false;
  panelOpenState: boolean = false;
  pp = '222222';
  telInputParam: ITelInputParams = {
    // phoneNumber:'+201062100486',
    isRequired: true,
    countryIsoCode: '{"initialCountry": "sa"}'
  }
  passdata: Date = new Date();
  voiceUrl: string | undefined;
  adminCard: ScientificProblemUsersEnum = ScientificProblemUsersEnum.Admin;
  constructor(public dialog: MatDialog, public domSanitizer: DomSanitizer, private attachmentService: AttachmentsService) { }

  ngOnInit(): void {
  }

  unassignedTasks: DragDropListItem[] = [
    {
      id: '1',
      title: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from'
      // description: 'This is description of tasks 1'
    },
    {
      id: '2',
      title: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from'
      // description: 'This is description of tasks 2'
    },
    {
      id: '3',
      title: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from',
      // description: 'This is description of tasks 3'
    }
  ];

  assignedTasks = [
    {
      id: '4',
      title: 'Task 4',
      // description: 'This is description of tasks 4'
    },
    {
      id: '5',
      title: 'Task 5',
      // description: 'This is description of tasks 5'
    },
    {
      id: '6',
      title: 'Task 6',
      // description: 'This is description of tasks 6'
    }
  ];

  drop(event: CdkDragDrop<DragDropListItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  /*
   * custome pop-up 
   */
  result: string = '';
  confirmDialog(): void {
    const message = `Are you sure you want to do this?`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
    });
  }

  /*
 * custome card
 */

  cardLst = [
    { title: 'title ABC', content: 'content ABC', imgPath: '../../../assets/images/book.svg' },
    { title: 'title CDE', content: 'content CDE', imgPath: '../../../assets/images/mic.svg' },
    { title: 'title EFG', content: 'content EFG', imgPath: '../../../assets/images/book.svg' }
  ]
  student_card_scientificProblem: IScientificProblem[] = [
    { question: 'gsgs sfsegf arfawr 1', reply: 'gry qr qarq ', huffazNo: 4150, scCreationDate: '03-05-1442' },
    { question: 'aerar ey wywww t1', reply: 'content content erfawera ', huffazNo: 4050, scCreationDate: '03-05-1442' },
    { question: 'aerar ey wywww t1', reply: 'content se aerfarf content', huffazNo: 4050, scCreationDate: '03-05-1442' },
    { question: 'aerar ey wywww t1', reply: 'content se aerfarf content', huffazNo: 4050, scCreationDate: '03-05-1442' },
    { question: 'aerar ey wywww t1', reply: 'content se aerfarf content', huffazNo: 4050, scCreationDate: '03-05-1442' },

  ]
  admin_card_scientificProblem: IScientificProblem[] = [
    { question: 'aerar ey wywww t1', reply: 'content content erfawera ', huffazNo: 4050, scCreationDate: '03-05-1442', usrId: "سيف الدين ابراهيم", progId: "اسم البرنام1", day: "الواجب اليومي - يوم " },
    { question: 'aerar ey wywww t1', reply: 'content content erfawera ', huffazNo: 4050, scCreationDate: '03-05-1442', usrId: "سيف الدين ابراهيم", progId: "اسم البرنام1", day: "الواجب اليومي - يوم " },
    { question: 'aerar ey wywww t1', reply: 'content content erfawera ', huffazNo: 4050, scCreationDate: '03-05-1442', usrId: "سيف الدين ابراهيم", progId: "اسم البرنام1", day: "الواجب اليومي - يوم " },
    { question: 'aerar ey wywww t1', reply: 'content content erfawera ', huffazNo: 4050, scCreationDate: '03-05-1442', usrId: "سيف الدين ابراهيم", progId: "اسم البرنام1", day: "الواجب اليومي - يوم " },

  ]

  /*
   * custome accordion 
   */

  items: IDragDropAccordionItems[] = [
    {
      id: '1',
      title: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from',
      paragraph: "test test test test test test test test test test test test test test test test test test test test "
      // description: 'This is description of tasks 1'
    },
    {
      id: '2',
      title: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from',
      paragraph: "test341 test341 test341 test341 test341 test341 test341 test341 test341 test341 "
      // description: 'This is description of tasks 2'
    },
    {
      id: '3',
      title: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from',
      paragraph: "test12234 test12234 test12234 test12234 test12234 test12234 test12234 test12234 test12234 "
      // description: 'This is description of tasks 3'
    },
    {
      id: '4',
      title: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from',
      paragraph: "test12234 test12234 test12234 test12234 test12234 test12234 test12234 test12234 test12234 "
      // description: 'This is description of tasks 3'
    },
    {
      id: '5',
      title: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from',
      paragraph: "test12234 test12234 test12234 test12234 test12234 test12234 test12234 test12234 test12234 "
      // description: 'This is description of tasks 3'
    },
    {
      id: '6',
      title: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from',
      paragraph: "test12234 test12234 test12234 test12234 test12234 test12234 test12234 test12234 test12234 "
      // description: 'This is description of tasks 3'
    }
  ];


  hasError(event: any) {
    console.log(event);
  }

  getNumber(event: any) {
    console.log(event);
  }

  telInputObject(event: any) {
    console.log(event);
  }

  onCountryChange(event: any) {
    console.log(event);
  }

  savePhonNumber(event: any) {
    this.telInputParam.phoneNumber = event;
  }

  // date 
  dateToString = (date: any) => { date.year + '/' + date.month + '/' + date.day };

  getCalenderData(date: any) {
    this.HijriTOMilady(date);
  }

  Hijri(date: any) {
    date = date.year + '/' + date.month + '/' + date.day;
    console.log("Hijri ", date)
    this.higriPinding = date
  }
  Milady(date: any) {
    date = date.year + '/' + date.month + '/' + date.day;
    console.log("Milady ", date)
    this.MiladyPinding = date
  }
  HijriTOMilady(date: any) {
    var currentDate = date.year + '/' + date.month + '/' + date.day;
    moment.locale('en');
    var m = moment.utc(currentDate, 'iYYYY/iM/iD'); // Parse a Hijri date.
    var hijriDate = m.format('YYYY/M/D');
    console.log("HijriTOMilady ", hijriDate)
    this.dataPinding = hijriDate
  }

  //questin:IQuestion |undefined;
  addQuestion() {
    if (Object.keys(this.exam).length === 0) {
      let id = BaseConstantModel.newGuid();
      this.exam = { id: id, questions: [] }
    }
    let qid = BaseConstantModel.newGuid();
    let ques: IQuestion = { questionId: qid, questionNo: this.exam?.questions?.length + 1, answers: [] }
    this.exam.questions?.push(ques);
  }

  saveExam() {
    this.submitExam = true;
    this.examJson = JSON.stringify(this.exam);
  }

  /////recording/////
  saveVoiceUrl(event: any) {
    this.voiceUrl = event;
  }
  /////end recording////
}

