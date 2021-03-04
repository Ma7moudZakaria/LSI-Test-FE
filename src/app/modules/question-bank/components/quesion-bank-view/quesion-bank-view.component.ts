import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quesion-bank-view',
  templateUrl: './quesion-bank-view.component.html',
  styleUrls: ['./quesion-bank-view.component.scss']
})
export class QuesionBankViewComponent implements OnInit {
  selectedQuesionId:any;
  selectedCategoryId:any;
  constructor() { }

  ngOnInit(): void {
  }

  addNew(){
    this.selectedQuesionId = null;
  }
  loadSelectedQuesion(event:any){
   this.selectedQuesionId = event;
   // console.log(event);
  }

  setSelectedCategory(event:any){
    this.selectedCategoryId = event;
  }

}
