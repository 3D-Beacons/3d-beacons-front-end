import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private apiRoot: string = environment.apiHost;

  constructor() { }

  getUniProtSummaryUrl(): string {
    return this.apiRoot + '/uniprot/summary/';
  }

  getUniProtDetailsUrl(): string {
    return this.apiRoot + '/uniprot/';
  }

  getSequenceSearchUrl(): string {
    return this.apiRoot + '/sequence/search/';
  }

  getSequenceSearchResultUrl(): string {
    return this.apiRoot + '/sequence/hits/';
  }

  getProviderColor(provider: string): string {
    switch (provider) {
      case 'PDBe': return '#085f5c';
      case 'SWISS-MODEL': return '#7474bf';
      case 'PED': return '#2274a5';
      case 'AlphaFold DB': return '#0053d6';
      case 'SASBDB': return 'rgb(255,99,163)';
      default: return 'rgb(100,100,100)';
    }
  }

  getUniProtApiUrl(): string {
    return environment.uniprotApiUrl;
  }

  getExampleAccessions(): string[] {
    return ['P0DTD1', 'P38398'];
  }

}
