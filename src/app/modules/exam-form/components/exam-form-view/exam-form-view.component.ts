import { Component, OnInit,Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/core/services/language-services/language.service';

@Component({
  selector: 'app-exam-form-view',
  templateUrl: './exam-form-view.component.html',
  styleUrls: ['./exam-form-view.component.scss']
})
export class ExamFormViewComponent implements OnInit {
  selectedExamFormId={id:'',arabExamName:'',engExamName:''}; 
  examId:string|undefined;
  inputExamId:string|undefined;
  @Input() isViewAdd?:boolean; 
   @Input() closeExamForm?:boolean; 
  submitSuccess:boolean=true;
  showAddExamForm = false;
  addExamForm=false;
  constructor(
    public translate: TranslateService,
    private languageService: LanguageService
  ) {
    
   }

  ngOnInit(): void {
    this.setCurrentLang();
  }

  
  setCurrentLang(){
    this.emitHeaderTitle();
    this.languageService.currentLanguageEvent.subscribe(res => {
      this.emitHeaderTitle();
    });
  }

  emitHeaderTitle(){
    this.languageService.headerPageNameEvent.emit(this.translate.instant('EXAM_FORM.TITLE'));
  }

 

  setSelectedExam(event:any){
    this.selectedExamFormId = {id:event.id,arabExamName:event.arabExamName,engExamName:event.engExamName}; 
    this.examId=event.id;
    this.addExamForm=false;
  }

 

  setInputExamId(event:any){
    this.inputExamId = event;
    this.showAddExamForm =true;
  }
  
  loadListAfterAddExam(event:any){
    this.addExamForm=event;
  }

 

  closeAddExamForm(){
    this.showAddExamForm = false;
  }

  closeAddExamFormAfterSave(event:any){
   
    this.showAddExamForm = false;

  }
}
