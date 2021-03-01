import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WalkThroughService } from 'src/app/core/services/walk-through-services/walk-through-services';

@Component({
  selector: 'app-view-all-walk-through',
  templateUrl: './view-all-walk-through.html',
  styleUrls: ['./view-all-walk-through.scss']
})

export class ViewAllWalkThroughComponent implements OnInit {

  routeParams: any;
  walkThroughId: any;
  allWalkThroughData:any;
  isSuccess:any;
  successMessage:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private walkThroughService:WalkThroughService) { 
  }

  ngOnInit(){
    this.routeParams = this.router.url;
    this.walkThroughId = this.route.snapshot.params.id;
    console.log("Walk Through Id :" , this.walkThroughId);

    this.walkThroughService.getAllWalkThrough().subscribe(res =>{
      this.allWalkThroughData = res.data;
      console.log("All Walk Through Data :" , this.allWalkThroughData);
    });
  }

  deleteWalkThrough(Id: any)
  {
    console.log("Walk Through Id :" , Id)    
    this.walkThroughService.deleteWalkThrough(Id).subscribe(res =>{
      this.isSuccess = res.isSuccess;
      this.successMessage = res.message;
    });
  }
}