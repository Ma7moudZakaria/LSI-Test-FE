import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-students-rating',
  templateUrl: './students-rating.component.html',
  styleUrls: ['./students-rating.component.scss']
})
export class StudentsRatingComponent implements OnInit {
  ratig: boolean = true;
  ratigStars: boolean = true;
  constructor() { }
  onRate() {
   
  }
  items = [
    { type: "Country", title: "Armenia" },
    { type: "City", title: "Kapan" },
    { type: "City", title: "Goris" },
    { type: "City", title: "Hats’avan" },

    { type: "Country", title: "Angola" },
    { type: "City", title: "Catabola" },
    { type: "City", title: "Camacupa" },
    { type: "City", title: "Caluquembe" },

    { type: "Country", title: "Argentina" },
    { type: "City", title: "San Vicente" },
    { type: "City", title: "Santa Elena" },
    { type: "City", title: "Retiro" }
  ];
  ngOnInit(): void {
  }

}
