import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private apiRoot: string = environment.apiHost;

  constructor() { }

  getUniProtSummaryUrl(): string {
    return this.apiRoot +'/uniprot/summary/';
  }

  getUniProtDetailsUrl(): string {
    return this.apiRoot +'/uniprot/';
  }

}
