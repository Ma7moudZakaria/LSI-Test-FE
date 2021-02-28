import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentManagementService } from 'src/app/core/services/content-management-services/content-management.service';

@Component({
  selector: 'app-view-all-content-management',
  templateUrl: './view-all-content-management.html',
  styleUrls: ['./view-all-content-management.scss']
})

export class ViewAllContentManagementComponent implements OnInit {

  RouteParams: any;
  CMSId: any;
  AllCMSData:any;
  IsSuccess:any;
  SuccessMessage:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contentmanagementService:ContentManagementService) { 
  }

  ngOnInit(){
    this.RouteParams = this.router.url;
    this.CMSId = this.route.snapshot.params.id;
    console.log("CMS Type Id :" , this.CMSId);

    this.contentmanagementService.getAllContentManagementSystem().subscribe(res =>{
      this.AllCMSData = res.data;
      console.log("All CMS Data :" , this.AllCMSData);
    });
  }

  deleteCMS(Id: any)
  {
    console.log("CMS Id :" , Id)    
    this.contentmanagementService.deleteContentManagementSystem(Id).subscribe(res =>{
      this.IsSuccess = res.isSuccess;
      this.SuccessMessage = res.message;
    });
  }
}