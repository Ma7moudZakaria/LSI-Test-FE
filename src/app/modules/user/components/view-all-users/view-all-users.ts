import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user-services/user.service';

@Component({
  selector: 'app-view-all-users',
  templateUrl: './view-all-users.html',
  styleUrls: ['./view-all-users.scss']
})

export class ViewAllUsersComponent implements OnInit {

  RouteParams: any;
  userId: any;
  AllUsersData:any;
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

    this.userService.getAllUsers().subscribe(res =>{
      this.AllUsersData = res.data;
      console.log("All Users Data :" , this.AllUsersData);
    });
  }

  deleteUser(Id: any)
  {
    console.log("User Id :" , Id)    
    this.userService.deleteUser(Id).subscribe(res =>{
      this.IsSuccess = res.isSuccess;
      this.SuccessMessage = res.message;
    });
  }
}