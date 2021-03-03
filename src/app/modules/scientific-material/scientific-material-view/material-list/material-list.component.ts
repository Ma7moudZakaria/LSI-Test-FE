import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScientificMaterialFilter } from 'src/app/core/interfaces/scientific-material/scientific-matrial-filter';
import { ScientificMaterialGrid } from 'src/app/core/interfaces/scientific-material/scientific-matrial-grid';
import { ScientificMaterialService } from 'src/app/core/services/scientific-material-services/scientific-material.service';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.scss']
})
export class MaterialListComponent implements OnInit {
  materials : ScientificMaterialGrid[] =[];
  materialFilter = {} as ScientificMaterialFilter
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
      this.materials = res.data as ScientificMaterialGrid[];

    }, error => {
      console.log(error);
    })
  }
  loadMaterial(materialId:string){
    this.materialId?.emit(materialId);
  }
}
