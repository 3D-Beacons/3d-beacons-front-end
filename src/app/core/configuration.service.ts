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

  getProviderColor(provider: string): string {
    switch (provider) {
      case 'PDBE': return '#085f5c';
      case 'SWISSMODEL': return '#7474bf';
      case 'PED': return '#2274a5';
      default: return 'rgb(255,99,163)';
    }
  }

  getUniProtApiUrl(): string {
    return environment.uniprotApiUrl;
  }

  getExampleAccessions(): string[] {
    return ['P0DTD1', 'P38398'];
  }

}
