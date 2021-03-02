import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentManagementService } from 'src/app/core/services/content-management-services/content-management.service';

@Component({
  selector: 'app-view-all-content-management',
  templateUrl: './view-all-content-management.html',
  styleUrls: ['./view-all-content-management.scss']
})

export class ViewAllContentManagementComponent implements OnInit {

  routeParams: any;
  cmsId: any;
  allCMSData:any;
  isSuccess:any;
  successMessage:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contentmanagementService:ContentManagementService) { 
  }

  ngOnInit(){
    this.routeParams = this.router.url;
    this.cmsId = this.route.snapshot.params.id;
    console.log("CMS Type Id :" , this.cmsId);

    this.contentmanagementService.getAllContentManagementSystem().subscribe(res =>{
      this.allCMSData = res.data;
      console.log("All CMS Data :" , this.allCMSData);
    });
  }

  deleteCMS(Id: any)
  {
    console.log("CMS Id :" , Id)    
    this.contentmanagementService.deleteContentManagementSystem(Id).subscribe(res =>{
      this.isSuccess = res.isSuccess;
      this.successMessage = res.message;
    });
  }
}