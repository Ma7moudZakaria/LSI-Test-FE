import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateCompiler, TranslateService } from '@ngx-translate/core';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';
import { WalkThroughService } from 'src/app/core/services/walk-through-services/walk-through-services';

@Component({
  selector: 'app-view-all-walk-through',
  templateUrl: './view-all-walk-through.html',
  styleUrls: ['./view-all-walk-through.scss']
})

export class ViewAllWalkThroughComponent implements OnInit {

  routeParams: any;
  walkThroughId: any;
  allWalkThroughData:any;
  isSuccess:any;
  selectedWalkThroughPageId:any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public walkThroughService:WalkThroughService,
    private languageService: LanguageService,
    public translate: TranslateService) { 
  }

  ngOnInit(){
    this.setCurrentLang();
    // this.routeParams = this.router.url;
    // this.walkThroughId = this.route.snapshot.params.id;
    // console.log("Walk Through Id :" , this.walkThroughId);

    // this.walkThroughService.getAllWalkThrough().subscribe(res =>{
    //   this.allWalkThroughData = res.data;
    //   console.log("All Walk Through Data :" , this.allWalkThroughData);
    // });
  
  }

  setCurrentLang(){
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
    });
  }

  emitHeaderTitle(){
    this.languageService.headerPageNameEvent.emit(this.translate.instant('WALKTHROUGH.TITLE'));
  }

  // deleteWalkThrough(Id: any)
  // {
  //   console.log("Walk Through Id :" , Id)    
  //   this.walkThroughService.deleteWalkThrough(Id).subscribe(res =>{
  //     this.isSuccess = res.isSuccess;
  //     this.successMessage = res.message;
  //   });
  // }

  setSelectedPageId(event:any){    
      this.selectedWalkThroughPageId = event;  
  }
}