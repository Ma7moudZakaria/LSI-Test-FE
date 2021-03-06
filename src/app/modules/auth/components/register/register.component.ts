import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces/auth/iuser-model';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  routeParams:any;
  signup = false;
  editProfile = false;
  registrationModel = {};
  registerform : FormGroup  = new FormGroup({});
  errorMessage:any;
  isSubmit = false;
  successMessage: any;
  hidePassword = true;

  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.routeParams = this.router.url;
    this.loadUserForm();
    
    if (this.routeParams === '/auth/register') {
      this.signup = true;
      this.editProfile = false;
    } else if (this.routeParams === '/user/edit-profile') {
      this.signup = false;
      this.editProfile = true;
    }
  }

  get f() {
    return this.registerform.controls;
  }

  loadUserForm() {
    this.registerform = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      name: ["", Validators.required],
      fathername: ["", Validators.required],
      familyname: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    });
    // {
    //   validator: this.customValidation.MatchPassword("password","confirmPassword")
    // })
  }

  onSignup(value: string) {
    this.isSubmit = true;
    this.errorMessage = '';
    localStorage.clear();
    this.registrationModel = {
      uname: this.registerform.value.name + " " + this.registerform.value.fathername + " " + this.registerform.value.familyname,
      uemail: this.registerform.value.email,
      ucpass: this.registerform.value.confirmPassword,//""
      upass: this.registerform.value.password
    }

    this.authService.register(this.registrationModel).subscribe(res => {
      this.isSubmit = true;
      if (res.isSuccess) {
        localStorage.setItem('user',JSON.stringify(res.data as IUser))
        // this.showActiveMessage = res.message;
        this.successMessage={
          message: res.message,
          type:'success'
        }
        setTimeout(()=>{            
          // this.router.navigate(['/home']);
         }, 3000);
        }
        else {
          this.errorMessage = res.message;
        }
    })
  }
}
