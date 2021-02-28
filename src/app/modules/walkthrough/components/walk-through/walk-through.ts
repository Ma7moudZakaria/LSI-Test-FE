import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IWalkThrough } from 'src/app/core/interfaces/walkthrough-interfaces/iwalkthrough';
import { WalkThroughService } from 'src/app/core/services/walk-through-services/walk-through-services';


@Component({
  selector: 'app-walk-through',
  templateUrl: './walk-through.html',
  styleUrls: ['./walk-through.scss']
})

export class WalkThroughComponent implements OnInit {

  WalkThroughForm!: FormGroup;
  walkThrough!: IWalkThrough;
  createWalkThrough = false;
  updateWalkThrough = false;
  errorMessage:any;
  walkThroughId!: string;
  RouteParams: any;
  isSubmit = false;

  constructor(
    private route: ActivatedRoute, private fb: FormBuilder,
    private walkThroughService:WalkThroughService) {
  }

  ngOnInit(){      
      this.walkThroughId = this.route.snapshot.params.id;

      if (this.RouteParams === '/walk-through/create-walk-through') {
          this.createWalkThrough = true;
          this.updateWalkThrough = false;
      } else if (this.RouteParams.includes('/user/update-walk-through') && this.walkThroughId != null) {
          this.walkThroughService.getWalkThroughById(this.walkThroughId).subscribe(res => {
            this.walkThrough = res.data;
          })
          this.createWalkThrough = false;
          this.updateWalkThrough = true;
      }
  }

  onSubmit(form: NgForm) {
    this.isSubmit = true;
    this.mappModel(form);

    if (this.updateWalkThrough) {
      this.walkThroughService.updateWalkThrough(this.walkThrough).subscribe(
        res => {
            this.isSubmit = true;
        }
      );
    }
    else {
      this.walkThroughService.createWalkThrough(this.walkThrough).subscribe(
        res => {
            this.isSubmit = true;
        }
      );
    }
  }

  mappModel(form: NgForm) {
    this.walkThrough.textAr = form.value.textAr;
    this.walkThrough.textEn = form.value.textEn;
    this.walkThrough.walkThroughId = form.value.id;
  }

  get f() {
    return this.WalkThroughForm.controls;
  }

  buildForm() {
    this.WalkThroughForm = this.fb.group(
      {
        textAr: ['', Validators.required],
        textEn: ['', Validators.required]        
      }
    )
  }

  PopulateForm() {
    this.f.textAr.setValue(this.walkThrough.textAr);
    this.f.textEn.setValue(this.walkThrough.textEn);
  }
}