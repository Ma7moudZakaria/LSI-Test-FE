import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IScientificMaterialFilter } from 'src/app/core/interfaces/scientific-material/iscientific-matrial-filter';
import { IScientificMaterialGrid } from 'src/app/core/interfaces/scientific-material/iscientific-matrial-grid';
import { ScientificMaterialService } from 'src/app/core/services/scientific-material-services/scientific-material.service';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss']
})
export class MaterialListComponent implements OnInit {
  materials : IScientificMaterialGrid[] =[];
  materialFilter = {} as IScientificMaterialFilter
  @Input() selectedProgramId?:string; 
  @Output() materialId = new EventEmitter<string>();;
  constructor( private scientifcMaterialService: ScientificMaterialService) { }

  ngOnInit(): void {
    this.loadProgramMaterial();
  }
  ngOnChanges(changes: any) {
    console.log(changes);
    this.loadProgramMaterial(changes.selectedProgramId.currentValue);
  }
  loadProgramMaterial(programId?:any){
    this.materialFilter.skip=0;
    this.materialFilter.take =10;
    this.materialFilter.programs = programId ? programId : undefined
    this.scientifcMaterialService.getScientificMateriaFilter(this.materialFilter).subscribe(   
         (res: any) => {
      this.materials = res.data as IScientificMaterialGrid[];

    }, error => {
      console.log(error);
    })
  }
  loadMaterial(materialId:string){
    this.materialId?.emit(materialId);
  }
}
