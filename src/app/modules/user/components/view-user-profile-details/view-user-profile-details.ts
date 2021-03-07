import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces/auth/iuser-model';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { IUserProfile } from 'src/app/core/interfaces/user-interfaces/iuserprofile';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { UserService } from 'src/app/core/services/user-services/user.service';


@Component({
  selector: 'app-view-user-profile-details',
  templateUrl: './view-user-profile-details.html',
  styleUrls: ['./view-user-profile-details.scss']
})

export class ViewUserProfileDetailsComponent implements OnInit {

  RouteParams: any;
  userProfileDetails : any;
  isSuccess:any;
  successMessage:any;
  allLookups:any;
  listOfLookupProfile: string[] = ['GENDER','EDU_LEVEL','NATIONALITY','COUNTRY'];
  currentUser:any;
  errorMessage:any;
  collectionOfLookup = {} as ILookupCollection;

  genderData :any;
  countryData :any;
  nationalityData :any;
  educationalLevelData :any;

  constructor(
    private router: Router,
    private lookupService:LookupService,
    private userService:UserService) { 
  }

  ngOnInit(){
    this.currentUser = JSON.parse(localStorage.getItem("user") as string) as IUser;

    this.userProfileDetails as IUserProfile;
    this.RouteParams = this.router.url;

    this.lookupService.getLookupByKey(this.listOfLookupProfile).subscribe(res =>{
      this.collectionOfLookup = res.data;

      if (res.isSuccess){
        this.getUserProfile(this.currentUser.id)
        
        this.successMessage={
          message:"Activate Code send successfully",
          type:'success'
        }
      }
      else{
        this.errorMessage  = res.message;
      }
    });    
  }

  getUserProfile(id : any)
  {
    this.userService.viewUserProfileDetails(id).subscribe(res =>{
      
      this.userProfileDetails = res.data;
      if (res.isSuccess){
      }
      else{
        this.errorMessage  = res.message;
      }
    });
  }
}