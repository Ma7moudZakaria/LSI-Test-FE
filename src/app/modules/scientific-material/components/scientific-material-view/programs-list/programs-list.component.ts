import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageEnum } from 'src/app/core/enums/language-enum.enum';
import { ScientificMaterialService } from 'src/app/core/services/scientific-material-services/scientific-material.service';

@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.scss']
})
export class ProgramsListComponent implements OnInit {
  programs: any;
  @Output() selectedProgramId = new EventEmitter<string>();;
  langEnum = LanguageEnum;
  constructor(private scientifcMaterialService: ScientificMaterialService,public translate : TranslateService) { }

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms() {
    this.scientifcMaterialService.getProgramsLookup().subscribe(
      (res: any) => {
        this.programs = res.data as any[];

      }, error => {
        console.log(error);
      }
    );
  }
  selectedIndex:any;
  loadProgramMaterial(id?:any){
    this.selectedProgramId?.emit(id);
  } 
}
