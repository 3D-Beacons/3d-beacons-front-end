import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

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
