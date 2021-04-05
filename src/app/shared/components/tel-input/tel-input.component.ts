import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tel-input',
  templateUrl: './tel-input.component.html',
  styleUrls: ['./tel-input.component.scss']
})
export class TelInputComponent implements OnInit {
  phonNumber = '';
  @Output() getPhonNumber = new EventEmitter<string>();
  @Input() setPhonNumber = '';
  constructor() { }
  hasError(event:any){
    console.log(event);
  }
  ngOnInit(): void {
  }
  getNumber(event:any){
    console.log(event);
    this.getPhonNumber.emit=event;
    console.log('getNumber'+this.getPhonNumber);
  }
  
  telInputObject(event:any){
    console.log(event);
 
   
  }
  
  onCountryChange(event:any){
    console.log(event);
    
    
  }
}
