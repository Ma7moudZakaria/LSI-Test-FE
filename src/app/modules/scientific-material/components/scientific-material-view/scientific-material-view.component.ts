import { Component, OnInit } from '@angular/core';
import { ScientificMaterialService } from 'src/app/core/services/scientific-material-services/scientific-material.service';

@Component({
  selector: 'app-scientific-material-view',
  templateUrl: './scientific-material-view.component.html',
  styleUrls: ['./scientific-material-view.component.scss']
})
export class ScientificMaterialViewComponent implements OnInit {

  programs: any;
  selectedMaterialId:any;
  selectedProgramId:any;
  constructor( private scientifcMaterialService: ScientificMaterialService) { }

  ngOnInit(): void {
    this.loadPrograms()
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
  addNewMaterial(){
    this.selectedMaterialId = null;
  }
  loadSelectedMateial(event:any){
   this.selectedMaterialId = event;
   // console.log(event);
  }

  setSelectedProgram(event:any){
    this.selectedProgramId = event;
  }

}
