import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ScientificMaterialService } from 'src/app/core/services/scientific-material-services/scientific-material.service';

@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.scss']
})
export class ProgramsListComponent implements OnInit {
  programs: any;
  @Output() selectedProgramId = new EventEmitter<string>();;

  constructor(private scientifcMaterialService: ScientificMaterialService) { }

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

  loadProgramMaterial(id:string){
    this.selectedProgramId?.emit(id);
  } 
}
