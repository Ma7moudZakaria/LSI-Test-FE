import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ScientificProblemService } from 'src/app/core/services/scientific-problem-services/scientific-problem.service';
import { ICreateScientificProblem } from 'src/app/core/interfaces/scientific-problrm/icreate-scientific-problem';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';

@Component({
  selector: 'app-add-scientific-problem',
  templateUrl: './add-scientific-problem.component.html',
  styleUrls: ['./add-scientific-problem.component.scss']
})
export class AddScientificProblemComponent implements OnInit {
  currentUser: IUser | undefined;
  isSubmit = false;
  disableSaveButtons = false;
  currentForm: FormGroup = new FormGroup({});
  resMessage: BaseMessageModel = {};
  createScientificProblemModel = {} as ICreateScientificProblem;

  @Input() scientificProblem?: string;
  @Output() closeScientificProblem = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private scientificProblemService: ScientificProblemService, private _alertify: AlertifyService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.currentForm.reset();
    this.buildForm();
    this.disableSaveButtons = false;
    this.resMessage = {
      message: '',
      type: ''
    }
  }
  get f() {
    return this.currentForm?.controls;
  }

  buildForm() {


    this.currentForm = this.fb.group(
      {
        question: ['', [Validators.required]],

      })
  }

  Submit() {
    this.isSubmit = true;
    this.resMessage = {};

    if (this.currentForm.valid) {
      this.createScientificProblemModel = {
        usrId: this.currentUser?.id,
        question: this.currentForm.value.question
      }
      console.log("question", this.currentForm.value.question)

      this.scientificProblemService.createScientificProblem(this.createScientificProblemModel).subscribe(
        res => {
          if (res.isSuccess) {
            this.isSubmit = false;
            this.disableSaveButtons = true;
            this._alertify.success(res.message || "");
            this.closeEvent();
          }
          else {
            this.disableSaveButtons = true;

            // this.errorMessage = response.message;
            this.resMessage = {
              message: res.message,
              type: BaseConstantModel.DANGER_TYPE
            }
          }
        },
        error => {
          this.resMessage = {
            message: error,
            type: BaseConstantModel.DANGER_TYPE
          }
        })
    }
  }

  closeEvent() {
    this.closeScientificProblem.emit(false);
  }
}
