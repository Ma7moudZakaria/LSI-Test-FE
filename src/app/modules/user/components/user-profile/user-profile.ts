import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProfileUser } from 'src/app/core/interfaces/user-interfaces/iprofileuser';
import { UserService } from 'src/app/core/services/user-services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.scss']
})

export class UserProfileComponent implements OnInit {
  UserProfileForm!: FormGroup;
  userProfile!: IProfileUser;
  completeUserProfile = false;
  updateUserProfile = false;
  errorMessage:any;
  userProfileId!: string;
  RouteParams: any;
  isSubmit = false;

  constructor(
    private route: ActivatedRoute, private fb: FormBuilder,
    private userProfileService:UserService) {
  }

  ngOnInit(){      
      this.userProfileId = this.route.snapshot.params.id;

      if (this.RouteParams === '/user-profile/complete-user-profile') {
          this.completeUserProfile = true;
          this.updateUserProfile = false;
      } else if (this.RouteParams.includes('/user-profile/complete-user-profile') && this.userProfileId != null) {
          this.userProfileService.viewUserProfileDetails(this.userProfileId).subscribe(res => {
            this.userProfile = res.data;
          })
          this.completeUserProfile = false;
          this.updateUserProfile = true;
      }
  }

  onSubmit(form: NgForm) {
    this.isSubmit = true;
    this.mappModel(form);

    if (this.updateUserProfile) {
      this.userProfileService.updateUser(this.userProfile).subscribe(
        res => {
            this.isSubmit = true;
        }
      );
    }
    else {
      this.userProfileService.completeProfile(this.userProfile).subscribe(
        res => {
            this.isSubmit = true;
        }
      );
    }
  }

  mappModel(form: NgForm) {
    this.userProfile.firstNameAr = form.value.firstNameAr;
    this.userProfile.firstNameEn = form.value.firstNameEn;
    this.userProfile.middleNameAr = form.value.middleNameAr;
    this.userProfile.middleNameEn = form.value.middleNameEn;
    this.userProfile.familyNameAr = form.value.familyNameAr;
    this.userProfile.familyNameEn = form.value.familyNameEn;
    this.userProfile.address = form.value.address;
    this.userProfile.birthdate = form.value.birthdate;
    this.userProfile.occupation = form.value.occupation;
    this.userProfile.educationalLevelId = form.value.educationalLevelId;
    this.userProfile.genderId = form.value.genderId;
    this.userProfile.countryId = form.value.countryId;
    this.userProfile.nationalityId = form.value.nationalityId;
    this.userProfile.phoneNumber = form.value.phoneNumber;
    this.userProfile.userId = form.value.userId;
  }

  get f() {
    return this.UserProfileForm.controls;
  }

  buildForm() {
    var mobilePattern = "^(05)([0-9]{8})*$|^(\\+\\d{1,3}[- ]?)?\\d{10}";
    this.UserProfileForm = this.fb.group(
      {
        FirstNameAr: ['', Validators.required],
        FirstNameEn: ['', Validators.required],
        MiddleNameAr: ['', Validators.required],
        MiddleNameEn: ['', Validators.required],
        FamilyNameAr: ['', Validators.required],
        FamilyNameEn: ['', Validators.required],
        DateOfBirth: [''],
        Nationality: [null, Validators.required],
        Educationallevel: [null, Validators.required],
        Gender: [null, Validators.required],
        Address: ['',Validators.required],
        MobileNumber: ['', Validators.pattern(mobilePattern)],
        Occupation: [null, Validators.required],
        CountryCode: [null, Validators.required]
      }
    )
  }

  PopulateForm() {
    this.f.FirstNameAr.setValue(this.userProfile.firstNameAr);
    this.f.FirstNameEn.setValue(this.userProfile.firstNameEn);
    this.f.MiddleNameAr.setValue(this.userProfile.middleNameAr);
    this.f.MiddleNameEn.setValue(this.userProfile.middleNameEn);
    this.f.FamilyNameAr.setValue(this.userProfile.familyNameAr);
    this.f.FamilyNameEn.setValue(this.userProfile.familyNameEn);
    this.f.Address.setValue(this.userProfile.address);
    this.f.Gender.setValue(this.userProfile.genderId);
    var birthdate = new Date(this.userProfile.birthdate.toString());
    this.f.DateOfBirth.setValue(
      new Date(birthdate.setDate(birthdate.getDate() + 1))
        .toISOString()
        .slice(0, 10)
    );
    this.f.Nationality.setValue(this.userProfile.nationalityId);
    this.f.Occupation.setValue(this.userProfile.occupation);
    this.f.Educationallevel.setValue(this.userProfile.educationalLevelId);
    this.f.PhoneNumber.setValue(this.userProfile.phoneNumber);
    this.f.CountryCode.setValue(this.userProfile.countryId);
  }
}