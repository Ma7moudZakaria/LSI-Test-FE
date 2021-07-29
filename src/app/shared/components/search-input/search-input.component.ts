import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  langEnum = LanguageEnum;
  @Output() searchTerm =  new EventEmitter<string>();
  @Input() searchKey:string='';
  constructor(public translate : TranslateService) { }

  ngOnInit(): void {
    
  }

  updateSearchTerm(){
    this.searchTerm.emit(this.searchKey);
  }
  
}
