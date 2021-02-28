import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/core/interfaces/auth/user-model';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  RouteParams:any;
  signup = false;
  editProfile = false;
  registrationModel: UserModel | undefined;
  userForm: FormGroup | undefined;
  errorMessage: string | undefined;
  isSubmit = false;
  showActiveMessage = '';

  prices = {
    title: 'Background And Solution',
    description: `Prices are per portfolio report for each year end. Note that you can revise your portfolio but can only produce one final report per fee.`,
    list: [
        'international Clients: $150 / report',
        'South African Clients: R2200 (Excl VAT)',
        'Payments are done by secure credit card or EFT (SA Clients only).',
    ],
  };
  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.RouteParams = this.router.url;
    this.loadUserForm();
    if (this.RouteParams === '/auth/signup') {
      this.signup = true;
      this.editProfile = false;
    } else if (this.RouteParams === '/user/edit-profile') {
      this.signup = false;
      this.editProfile = true;
      // this.userEditObj = JSON.parse(localStorage.getItem('currentUser'));
      this.fillUserForm();
    }
  }

  get f() {
    return this.userForm?.controls;
  }

  loadUserForm() {
    this.userForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      name: ["", Validators.required],
      phone: ["", Validators.required],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    });
    // {
    //   validator: this.customValidation.MatchPassword("password","confirmPassword")
    // })
  }

  // fillUserForm() {
  //   this.f.email.setValue(this.userEditObj.email);
  //   this.f.name.setValue(this.userEditObj.name);
  //   this.f.phone.setValue(this.userEditObj.phone);
  // }

  onSignup(/*form: NgForm*/) {
    this.isSubmit = true;
    this.errorMessage = '';
    localStorage.clear();

    console.log(this.userForm?.value);
    this.registrationModel = {
      email: this.userForm?.value.email,
      userName: this.userForm?.value.userName,
      confirmPassword: this.userForm?.value.confirmPassword,
      password: this.userForm?.value.password
    }

    this.authService.register(this.registrationModel).subscribe(res => {
      this.isSubmit = true;
      if (res.isSuccess) {
        this.showActiveMessage = "Account created successfully, please check you email for activation";
        setTimeout(()=>{            
          this.router.navigate(['/home']);
         }, 3000);
        }
        else {
          this.errorMessage = res.message;
        }
    })
  }
}
