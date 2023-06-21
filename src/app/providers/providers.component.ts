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
          name: 'Protein Data Bank in Europe',
          url: 'https://www.ebi.ac.uk/pdbe/'
        },
        {
          name: 'AlphaFold Protein Structure Database',
          url: 'https://www.alphafold.ebi.ac.uk/'
        },
        {
          name: 'Protein Ensemble Database',
          url: 'https://proteinensemble.org/'
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
          name: 'AlphaFill',
          url: 'https://alphafill.eu/'
        },
        {
          name: 'ModelArchive',
          url: 'https://modelarchive.org/'
        }
      ],
      [
        {
          name: 'HegelLab.org',
          url: 'http://www.hegelab.org/'
        },
        {
          name: 'Isoform.io',
          url: 'https://isoform.io/'
        }
      ]
    ];
  }

}
