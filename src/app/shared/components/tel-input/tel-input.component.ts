import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tel-input',
  templateUrl: './tel-input.component.html',
  styleUrls: ['./tel-input.component.scss']
})
export class TelInputComponent implements OnInit {
  phonNumber = '';
  @Output() getPhonNumber = new EventEmitter<string>();
  constructor() { }
  hasError(event:any){
    console.log(event);
  }
  ngOnInit(): void {
  }
  getNumber(event:any){
    console.log(event);
    this.getPhonNumber=event;
    console.log('getNumber'+this.getPhonNumber);
  }
  
  telInputObject(event:any){
    console.log(event);
    console.log('telInputObject'+this.getPhonNumber);
   
  }
  
  onCountryChange(event:any){
    console.log(event);
    console.log('onCountryChange'+this.getPhonNumber);
    
  }
}
