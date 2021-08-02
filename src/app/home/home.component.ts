import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataProviders: any;

  constructor() {
    this.dataProviders = [
      {
        name: 'Protein Data Bank in Europe',
        url: ''
      },
      {
        name: 'Protein Ensemble Database',
        url: ''
      },
      {
        name: 'AlphaFold Protein Structure Database',
        url: ''
      },
      {
        name: 'SWISS-MODEL',
        url: ''
      },
      {
        name: 'Genome3D',
        url: ''
      },
      {
        name: 'SASBDB',
        url: ''
      },
    ];
  }

  ngOnInit(): void {
  }

}
