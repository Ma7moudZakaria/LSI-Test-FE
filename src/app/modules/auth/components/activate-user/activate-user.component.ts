import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth-services/auth.service';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss']
})
export class ActivateUserComponent implements OnInit {

  userId:any;
  successMessage:any;

  constructor(private router: Router,private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.ActivateUser(this.userId).subscribe(res => {
      console.log(res);
      if (res.isSuccess){
        this.successMessage={
          message:"Activation code send successfully",
          type:'success'
        }
        setTimeout(()=>{
            this.router.navigateByUrl('/auth/login');
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

}
