import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tel-input',
  templateUrl: './tel-input.component.html',
  styleUrls: ['./tel-input.component.scss']
})
export class TelInputComponent implements OnInit {
  pp = '2222222';
  constructor() { }
  hasError(event:any){
    console.log(event);
  }
  ngOnInit(): void {
  }
  getNumber(event:any){
    console.log(event);
  }
  
  telInputObject(event:any){
    console.log(event);
  }
  
  onCountryChange(event:any){
    console.log(event);
  }
}
