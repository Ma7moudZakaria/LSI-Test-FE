import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { BaseLookupModel } from 'src/app/core/ng-model/base-lookup-model';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';

@Component({
  selector: 'app-walk-through-pages',
  templateUrl: './walk-through-pages.component.html',
  styleUrls: ['./walk-through-pages.component.scss']
})
export class WalkThroughPagesComponent implements OnInit {
  successMessage:any;
  errorMessage: any;
  collectionOfLookup = {} as ILookupCollection;
  walkThroughPages? = {} as BaseLookupModel[];
  listOfLookupProfile : string[] = ['WLAKTHROUGHPAGES'];
  langEnum = LanguageEnum ;
  @Output() selectedWalkThroughPageId = new EventEmitter<string>();;

  constructor( private lookupService:LookupService,public translate: TranslateService) { }

  ngOnInit(): void {
    this.lookupService.getLookupByKey(this.listOfLookupProfile).subscribe(res =>{
      this.collectionOfLookup = res.data;
      this.walkThroughPages = 
      this.collectionOfLookup.WLAKTHROUGHPAGES?.sort((a,b) => this.compare(a,b) );
      if (res.isSuccess){
        this.successMessage={
          message: res.message,
          type:'success'
        }
      }
      else{
        this.errorMessage  =={
          message: res.message,
          type:'Danger'
        }
      }
    });
  }
  selectedIndex:any;
  loadPageWalkThrough(id?:any){
    this.selectedWalkThroughPageId?.emit(id);

  }
  compare(a:BaseLookupModel,b:BaseLookupModel){
    if (a.huffazId && b.huffazId) {
      return a.huffazId > b.huffazId ?  1 : -1;
    }
    return 0;
  }
}
