import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WalkThroughService } from 'src/app/core/services/walk-through-services/walk-through-services';

@Component({
  selector: 'app-view-all-walk-through',
  templateUrl: './view-all-walk-through.html',
  styleUrls: ['./view-all-walk-through.scss']
})

export class ViewAllWalkThroughComponent implements OnInit {

  RouteParams: any;
  WalkThroughId: any;
  AllWalkThroughData:any;
  IsSuccess:any;
  SuccessMessage:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private walkThroughService:WalkThroughService) { 
  }

  ngOnInit(){
    this.RouteParams = this.router.url;
    this.WalkThroughId = this.route.snapshot.params.id;
    console.log("Walk Through Id :" , this.WalkThroughId);

    this.walkThroughService.getAllWalkThrough().subscribe(res =>{
      this.AllWalkThroughData = res.data;
      console.log("All Walk Through Data :" , this.AllWalkThroughData);
    });
  }

  deleteWalkThrough(Id: any)
  {
    console.log("Walk Through Id :" , Id)    
    this.walkThroughService.deleteWalkThrough(Id).subscribe(res =>{
      this.IsSuccess = res.isSuccess;
      this.SuccessMessage = res.message;
    });
  }
}