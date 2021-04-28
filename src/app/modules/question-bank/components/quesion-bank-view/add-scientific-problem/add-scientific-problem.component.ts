import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { ScientificProblemService } from 'src/app/core/services/scientific-problem-services/scientific-problem.service';
import { ICreateScientificProblem } from 'src/app/core/interfaces/scientific-problrm/icreate-scientific-problem';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { IUser } from 'src/app/core/interfaces/auth-interfaces/iuser-model';

@Component({
  selector: 'app-add-scientific-problem',
  templateUrl: './add-scientific-problem.component.html',
  styleUrls: ['./add-scientific-problem.component.scss']
})
export class AddScientificProblemComponent implements OnInit {
  currentUser: IUser | undefined;
  errorMessage?: string;
  successMessage?: string;
  isSubmit = false;
  currentForm: FormGroup = new FormGroup({});
  resMessage: BaseMessageModel = {};
  createScientificProblemModel = {} as ICreateScientificProblem;

  constructor(private fb: FormBuilder, private createScientificProblemService: ScientificProblemService) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
    this.currentForm.reset();
    this.buildForm();
  }
  get f() {
    return this.currentForm?.controls;
  }

  buildForm() {


    this.currentForm = this.fb.group(
      {
        Question: ['', [Validators.required]],

      })
  }





  Submit() {
    this.isSubmit = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.resMessage = {};

    if (this.currentForm.valid) {

      this.createScientificProblemModel = {
        usrId: this.currentUser?.id,
        question: this.currentForm.value.Question
      }

      this.createScientificProblemService.createScientificProblem(this.createScientificProblemModel).subscribe(
        res => {
          var response = res;
          if (response.isSuccess) {
            this.resMessage = {
              message: response.message,
              type: BaseConstantModel.SUCCESS_TYPE
            }
          }
          else {
            // this.errorMessage = response.message;
            this.resMessage = {
              message: response.message,
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
}
