import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ILookupCollection } from 'src/app/core/interfaces/lookup/ilookup-collection';
import { BaseMessageModel } from 'src/app/core/ng-model/base-message-model';
import { AlertifyService } from 'src/app/core/services/alertify-services/alertify.service';
import { LanguageService } from 'src/app/core/services/language-services/language.service';
import { LookupService } from 'src/app/core/services/lookup-services/lookup.service';

@Component({
  selector: 'app-add-stu-duty-days-to-program',
  templateUrl: './add-stu-duty-days-to-program.component.html',
  styleUrls: ['./add-stu-duty-days-to-program.component.scss']
})
export class AddStuDutyDaysToProgramComponent implements OnInit {
  @Output() closeDayTasks = new EventEmitter<boolean>();
  programDayTasksForm: FormGroup = new FormGroup({})
  langEnum = LanguageEnum;
  collectionOfLookup = {} as ILookupCollection;
 // createProgramDayTasksModel = Array<ICreateProgramDayTasksModel>();
  listOfLookups: string[] = ['DAYS'];
  resMessage: BaseMessageModel = {};
  //selectedProgramDayTasksList = Array<ICreateProgramDayTasksModel>();


  constructor(
    public languageService: LanguageService,
    public translate: TranslateService,
    private fb: FormBuilder,
    private lookupService: LookupService,
    private alertify:AlertifyService
  ) { }

  ngOnInit(): void {
    this.getLookupByKey(); 
  }

  getLookupByKey() {
    this.lookupService.getLookupByKey(this.listOfLookups).subscribe(res => {
     
      if (res.isSuccess) {
        this.collectionOfLookup = res.data as ILookupCollection;
      }
      else {
        this.alertify.error(res.message || "")
      }
    }, error => {
      this.alertify.error(error)
    });
  }



  

  onTaskChange(item : any, event : any){
    // if (event.checked){
    //   this.selectedProgramDayTasksList.push(item.id);
    // }
    // else{
    //   let it = this.selectedProgramDayTasksList.filter(i => i === item.id)[0];
    //   const ind = this.selectedProgramDayTasksList?.indexOf(it);
    //   if (ind > -1) {
    //     this.selectedProgramDayTasksList?.splice(ind, 1);
    //   }
    // }
  }

  async onSubmit() {

  }

  closeEvent() {
    this.closeDayTasks.emit();
  }
}
