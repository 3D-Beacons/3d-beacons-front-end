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
      [
        {
          name: 'PDBe-KB',
          url: 'https://pdbe-kb.org'
        },
        {
          name: 'Genome3D',
          url: 'http://www.genome3d.net/'
        },
        {
          name: 'Protein Data Bank in Europe',
          url: 'https://www.ebi.ac.uk/pdbe/'
        },
        {
          name: 'AlphaFold Protein Structure Database',
          url: 'https://www.alphafold.ebi.ac.uk/'
        }
      ],
      [
        {
          name: 'SASBDB',
          url: 'https://www.sasbdb.org/'
        },
        {
          name: 'SWISS-MODEL',
          url: 'https://swissmodel.expasy.org/'
        },
        {
          name: 'Protein Ensemble Database',
          url: 'https://proteinensemble.org/'
        },
        
        {
          name: 'AlphaFill',
          url: 'https://alphafill.eu/'
        }
      ],
      [
        {
          name: 'ModelArchive',
          url: 'https://modelarchive.org/'
        }
      ]
    ];
  }

}
