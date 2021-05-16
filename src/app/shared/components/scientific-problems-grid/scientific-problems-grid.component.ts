import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ScientificProblemUsersEnum } from 'src/app/core/enums/scientific-problem-users-enum.enum';
import { IScientificProblem } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem';
import { IScientificProblemFilter } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-filter';
import { IScientificProblemGridItems } from 'src/app/core/interfaces/scientific-problrm/iscientific-problem-grid-items';
import { IUserScientificProblemFilter } from 'src/app/core/interfaces/scientific-problrm/iuser-scientific-problem-filter';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { SettingRoutingModule } from 'src/app/modules/setting/setting-routing.module';

@Component({
  selector: 'app-scientific-problems-grid',
  templateUrl: './scientific-problems-grid.component.html',
  styleUrls: ['./scientific-problems-grid.component.scss']
})
export class ScientificProblemsGridComponent implements OnInit {

  @Output() adminFilterEvent = new EventEmitter<IScientificProblemFilter>();
  @Output() userFilterEvent = new EventEmitter<IUserScientificProblemFilter>();
  @Output() deleteUserScProb = new EventEmitter<string>();
  @Output() addReplyToScProb = new EventEmitter<IScientificProblemGridItems>();
  @Output() saveScProbToQuestionBank = new EventEmitter<IScientificProblemGridItems>();
  @Output() deleteListOfScProblems = new EventEmitter<string>();

  @Input() userMode: ScientificProblemUsersEnum = ScientificProblemUsersEnum.Student;
  @Input() adminFilterRequestModel : IScientificProblemFilter = {skip : 0, take: 0};
  @Input() userFilterRequestModel : IUserScientificProblemFilter = {skip : 0, take: 0};
  @Input() numberPerRow: number = 3; //default is 3 for student
  @Input() items: IScientificProblem[] = []
  @Input() adminItems: IScientificProblemGridItems[] = []
  @Input() totalCount: number= 0;
  
  orderTypeToggel = 1;
  userOrderTypeToggel = true;
  allSelected: boolean = false;

  scientificProblemUsers = ScientificProblemUsersEnum 
  page = 1


  constructor(public translate:TranslateService, private languageService:LanguageService) { }

  ngOnInit(): void {
    this.setCurrentLang();
  }

  setCurrentLang() {
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.updateLocalizatoinProps();
    });
  }

  updateLocalizatoinProps(){
    this.adminFilterRequestModel.sorField = this.translate.currentLang === LanguageEnum.ar ? 'studfullnamear' : 'studfullnameen';
  }

  onAdminPageChange(){
    this.adminFilterRequestModel.skip = (this.page - 1) * this.adminFilterRequestModel.take; 
    this.adminFilterEvent.emit(this.adminFilterRequestModel);
  }

  onUserPageChange(){
    this.userFilterRequestModel.skip = (this.page - 1) * this.userFilterRequestModel.take; 
    this.userFilterEvent.emit(this.userFilterRequestModel);
  }

  sortByName(){
    this.adminFilterRequestModel.sorField = this.translate.currentLang === LanguageEnum.ar ? 'studfullnamear' : 'studfullnameen';
    this.adminFilterRequestModel.ordType = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.adminFilterEvent.emit(this.adminFilterRequestModel);
  }

  sortByCreatedOn(){
    this.adminFilterRequestModel.sorField = 'createdon';
    this.adminFilterRequestModel.ordType = this.orderTypeToggel = this.orderTypeToggel === 1 ? -1 : 1;
    this.adminFilterEvent.emit(this.adminFilterRequestModel);
  }

  sortByNameOrderType(){
    if ((this.adminFilterRequestModel.sorField === "studfullnamear" || this.adminFilterRequestModel.sorField === "studfullnameen") && this.adminFilterRequestModel.ordType == 1) {return 'asend'}
    if ((this.adminFilterRequestModel.sorField === "studfullnamear" || this.adminFilterRequestModel.sorField === "studfullnameen") &&  this.adminFilterRequestModel.ordType == -1) {return 'desend'}

    return '';
  }

  sortByCreatedOnOrderType(){
    if (this.adminFilterRequestModel.sorField === "createdon" && this.adminFilterRequestModel.ordType == 1) {return 'asend'}
    if (this.adminFilterRequestModel.sorField === "createdon" && this.adminFilterRequestModel.ordType == -1) {return 'desend'}

    return '';
  }

  /**user */
  userSortByCreatedOn(){
    this.userFilterRequestModel.oType = this.userOrderTypeToggel = this.userOrderTypeToggel ? false : true;
    this.userFilterEvent.emit(this.userFilterRequestModel);
  }

  userSortByCreatedOnOrderType(){
    if (this.userFilterRequestModel.oType) {return true}
    else {return false}
  }

  deleteScientificProblem(id:string){
    this.deleteUserScProb.emit(id);
  }

  addReplyToScProbGr(event:IScientificProblemGridItems){
    this.addReplyToScProb.emit(event);
  }

  saveScProbToQuestionBankGr(event:IScientificProblemGridItems){
    this.saveScProbToQuestionBank.emit(event);
  }

  deleteScProblemsByIds(){
    this.deleteListOfScProblems.emit();
  }

  exportScProblems(){
    
  }

  /*
   *select all 
   */

   updateAllItemsChecked() {
    this.allSelected = this.adminItems != null && this.adminItems.every(t => t.checked);
  }

  someItemsChecked(): boolean {
    if (this.adminItems == null) {
      return false;
    }
    return this.adminItems.filter(t => t.checked).length > 0 && !this.allSelected;
  }

  setAllChecked(completed: boolean) {
    this.allSelected = completed;
    if (this.adminItems == null) {
      return;
    }
    this.adminItems.forEach(t => t.checked = completed);
  }
}