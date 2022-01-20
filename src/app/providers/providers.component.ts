import { Component } from '@angular/core';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent {

  dataProviders: any;

  constructor() {
    this.dataProviders = [
      {
        name: 'Protein Data Bank in Europe',
        url: 'https://www.ebi.ac.uk/pdbe/'
      },
      {
        name: 'Protein Ensemble Database',
        url: 'https://proteinensemble.org/'
      },
      {
        name: 'AlphaFold Protein Structure Database',
        url: 'https://www.alphafold.ebi.ac.uk/'
      },
      {
        name: 'SWISS-MODEL',
        url: 'https://swissmodel.expasy.org/'
      },
      {
        name: 'Genome3D',
        url: 'http://www.genome3d.net/'
      },
      {
        name: 'SASBDB',
        url: 'https://www.sasbdb.org/'
      },
      {
        name: 'PDBe-KB',
        url: 'https://pdbe-kb.org'
      },
      {
        name: 'AlphaFill',
        url: 'https://alphafill.eu/'
      }
    ];
  }

}
