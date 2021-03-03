
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IActivationCode } from 'src/app/core/interfaces/auth/iactivation-code-module';
import { IUser } from 'src/app/core/interfaces/auth/iuser-model';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss']
})

export class ActivateUserComponent implements OnInit {

  passwordShown = false;
  activationcodeform = new FormGroup({});
  activationcodeModel = {} as  IActivationCode;
  currentUser = {} as IUser;
  successMessage:any;
  hidePassword = true;
  errorMessage:any;

  userData?:string;

  constructor(
    private router: Router, private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.resetPasswordFormG();
    
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;
  }

  resetPasswordFormG() {
    this.activationcodeform = this.fb.group({
      firstNumber: ["", Validators.compose([Validators.required])],
      secondNumber: ["", Validators.compose([Validators.required])],
      thirdNumber: ["", Validators.compose([Validators.required])],
      fourthNumber: ["", Validators.compose([Validators.required])]
    });
  }

  get f() {
    return this.activationcodeform.controls;
  }

  sendActivateCode()
  {
    this.authService.sendActivateCode(this.currentUser.id).subscribe(res => {
      console.log(res);
      if (res.isSuccess){
        this.successMessage={
          message:"Activate Code send successfully",
          type:'success'
        }
        setTimeout(()=>{
            // this.router.navigateByUrl('/auth/login');
          },3000);
        }
      else{
        this.errorMessage  = res.message;
      }
    }); 
  }

  onApply(value:string) {
    if (this.activationcodeform.valid){

      this.activationcodeModel = {
        uid: this.currentUser.id,
        activCode: this.activationcodeform.value.firstNumber.toString() + this.activationcodeform.value.secondNumber.toString() + this.activationcodeform.value.thirdNumber.toString() + this.activationcodeform.value.fourthNumber.toString(),
      }
        
      this.authService.activateUser(this.activationcodeModel).subscribe(res => {
        console.log(res);
        if (res.isSuccess){
          this.successMessage={
            message:"Account is activated successfully",
            type:'success'
          }
          setTimeout(()=>{
              // this.router.navigateByUrl('/auth/login');
            },3000);
          }
        else{
          this.successMessage={
            message:res.message,
            type:'danger'
          }
        }
      });  
    }
    else{
      this.successMessage={
        message:"Please, fill inputes",
        type:'danger'
      }
    }
  } 
}
