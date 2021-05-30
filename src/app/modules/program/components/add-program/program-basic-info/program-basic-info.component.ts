import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProgramBasicInfoModel } from 'src/app/core/interfaces/programs-interfaces/iprogram-basic-info-model';

@Component({
  selector: 'app-program-basic-info',
  templateUrl: './program-basic-info.component.html',
  styleUrls: ['./program-basic-info.component.scss']
})
export class ProgramBasicInfoComponent implements OnInit {

  programType = ['برنامج حفظ', 'برنامج قراءة', 'برنامج شرح'];
  rate = ['من الطالب للمعلم', 'من المعلم للطالب']
  baseInfoForm: FormGroup = new FormGroup({});
  isSubmit = false;
  baseicInfoProgrmModel = {} as IProgramBasicInfoModel;

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.buildForm();
  }
  get f() {
    return this.baseInfoForm.controls;

  }

  buildForm() {
    this.baseInfoForm = this.fb.group(
      {
        progName: [''],
        shareWith: [''],
        progType: [''],
        durationProg: [''],
        timeHomework: [''],
        vaildDays: [''],
        ideaProg: [''],
        goalProg: [''],
        visionProg: [''],
        methodProg: [''],
        featuresProg: [''],
        textPledge: [''],
        countDays: [''],
        countDaysInputSelct: [''],
        examPass: [''],
        rateProg: [''],
        recitationDates: [''],
        thereNarration: [''],
        recitationPeriod: [''],
        fromTime: [''],
        toTime: [''],

      })
  }

  onSubmit() {
    this.isSubmit = true
  }
}
