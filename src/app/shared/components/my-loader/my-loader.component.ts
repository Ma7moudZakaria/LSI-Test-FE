// my-loader.component.ts
import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader-services/loader.service';


@Component({
  selector: 'app-my-loader',
  templateUrl: './my-loader.component.html',
  styleUrls: ['./my-loader.component.scss']
})
export class MyLoaderComponent implements OnInit {

  loading: boolean|undefined;

  constructor(private loaderService: LoaderService) {

    this.loaderService.isLoading.subscribe((v) => {
      console.log(v);
      this.loading = v;
    });

  }
  ngOnInit() {
  }

}
