import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user-services/user.service';
import { WalkThroughService } from 'src/app/core/services/walk-through-services/walk-through-services';

@Component({
  selector: 'app-view-user-profile-details',
  templateUrl: './view-user-profile-details.html',
  styleUrls: ['./view-user-profile-details.scss']
})

export class ViewUserProfileDetailsComponent implements OnInit {

  RouteParams: any;
  userId: any;
  UserProfileDetails:any;
  IsSuccess:any;
  SuccessMessage:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService:UserService) { 
  }

  ngOnInit(){
    this.RouteParams = this.router.url;
    this.userId = this.route.snapshot.params.id;
    console.log("User Id :" , this.userId);

    this.userService.viewUserProfileDetails(this.userId).subscribe(res =>{
      this.UserProfileDetails = res.data;
      console.log("User Profile Details :" , this.UserProfileDetails);
    });
  }

  deleteUser(Id: any)
  {
    console.log("User Profile Id :" , Id)    
    this.userService.deleteUser(Id).subscribe(res =>{
      this.IsSuccess = res.isSuccess;
      this.SuccessMessage = res.message;
    });
  }
}