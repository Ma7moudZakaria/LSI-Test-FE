import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITelInputParams } from 'src/app/core/interfaces/shared-interfaces/tel-input-interfaces/itel-input-params';

@Component({
  selector: 'app-tel-input',
  templateUrl: './tel-input.component.html',
  styleUrls: ['./tel-input.component.scss']
})
export class TelInputComponent implements OnInit {

  @Output() getPhonNumber = new EventEmitter<string>();
  @Input() telInputParam : ITelInputParams | undefined;
  valid:boolean = true;

  telInputOptions = JSON.parse('{"initialCountry": "eg"}');

  constructor() { }

  ngOnInit() {
    let countryIso = this.telInputParam?.countryIsoCode;
    this.telInputOptions = JSON.parse(countryIso || '{"initialCountry": "eg"}')
  }

  hasError(event:boolean){
    this.valid = event;
  }

  getNumber(event:string){
    this.telInputParam!.phoneNumber = event;
    this.getPhonNumber.emit(event);
  }
  
  telInputObject(event:any){
    // console.log(event);
  }
  
  onCountryChange(event:any){
    // console.log(event);
  }

  //not valid validation
  // phoneLengthValidation(){
  //   return this.telInputParam!.phoneNumber.length < 6 || this.telInputParam!.phoneNumber.length > 16
  // }
}
