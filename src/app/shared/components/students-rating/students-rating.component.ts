import { Component, OnInit } from '@angular/core';

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
    { type: "Country", title: "Armenia hwln xbijksnx" },
    { type: "City", title: "Kapan" }

   
  ];
  ngOnInit(): void {
  }

}
