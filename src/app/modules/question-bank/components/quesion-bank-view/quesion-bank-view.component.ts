import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-quesion-bank-view',
  templateUrl: './quesion-bank-view.component.html',
  styleUrls: ['./quesion-bank-view.component.scss']
})
export class QuesionBankViewComponent implements OnInit {
  selectedQuestionId:string | undefined;
  selectedCategoryId:any;
  showAddQuiestion?:boolean=false;
  @Input() isViewAdd?:boolean; 
  constructor() { }

  ngOnInit(): void {
  }

  addNew(){
    this.selectedQuestionId = '';
    this.showAddQuiestion=true;
  }
  loadSelectedQuesion(event:any){
   this.selectedQuestionId = event.id;
   this.showAddQuiestion= event.show;
   // console.log(event);
  }

  setSelectedCategory(event:any){
    this.selectedCategoryId = event;
  }
 

}
