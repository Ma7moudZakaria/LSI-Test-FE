import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { BaseConstantModel } from 'src/app/core/ng-model/base-constant-model';
import { BaseLookupModel } from 'src/app/core/ng-model/base-lookup-model';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';

@Component({
  selector: 'app-walk-through-pages',
  templateUrl: './walk-through-pages.component.html',
  styleUrls: ['./walk-through-pages.component.scss']
})
export class WalkThroughPagesComponent implements OnInit {

  collectionOfLookup = {} as ILookupCollection;
  walkThroughPages? = [] as BaseLookupModel[];
  listOfLookupProfile : string[] = ['WLAKTHROUGHPAGES'];
  langEnum = LanguageEnum ;
  resMessage: BaseMessageModel = {};
  @Output() selectedWalkThroughPageId = new EventEmitter<string>();;

  constructor( private lookupService:LookupService,public translate: TranslateService) { }

  ngOnInit(): void {
    this.lookupService.getLookupByKey(this.listOfLookupProfile).subscribe(res =>{
     
      if (res.isSuccess){
        this.collectionOfLookup = res.data;
        this.walkThroughPages = 
        this.collectionOfLookup.WLAKTHROUGHPAGES?.sort((a,b) => this.compare(a,b) );
       if(this.collectionOfLookup.WLAKTHROUGHPAGES) 
        this.selectedWalkThroughPageId?.emit(this.collectionOfLookup.WLAKTHROUGHPAGES[0].id);

      }
      else{
        this.resMessage = {
          message: res.message,
          type: BaseConstantModel.DANGER_TYPE
        }
      }
    },error => {
      this.resMessage = {
        message: error,
        type: BaseConstantModel.DANGER_TYPE
      }
    });
  }

  selectedIndex=0;
  loadPageWalkThrough(id?:string){
    this.selectedWalkThroughPageId?.emit(id);

  }
  
  compare(a:BaseLookupModel,b:BaseLookupModel){
    if (a.huffazId && b.huffazId) {
      return a.huffazId > b.huffazId ?  1 : -1;
    }
    return 0;
  }
}
