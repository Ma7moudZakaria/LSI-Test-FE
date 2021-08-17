import { Component, Input, OnInit } from '@angular/core';
import { IProgramDetails } from 'src/app/core/interfaces/programs-interfaces/iprogram-details';

@Component({
  selector: 'app-prog-batches-details',
  templateUrl: './prog-batches-details.component.html',
  styleUrls: ['./prog-batches-details.component.scss']
})
export class ProgBatchesDetailsComponent implements OnInit {

  @Input() programDetails : IProgramDetails | undefined ;
  test = [0,1,2,3,4,5,6,7,8,9];
  showTap: string = 'teacher';

  constructor() { }

  ngOnInit(): void {
  }

}
