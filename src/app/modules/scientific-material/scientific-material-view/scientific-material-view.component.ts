import { Component, OnInit } from '@angular/core';
import { ScientificMaterialService } from 'src/app/core/services/scientific-material-services/scientific-material.service';

@Component({
  selector: 'app-scientific-material-view',
  templateUrl: './scientific-material-view.component.html',
  styleUrls: ['./scientific-material-view.component.scss']
})
export class ScientificMaterialViewComponent implements OnInit {

  programs: any;

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

}
