import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SummaryResponse } from '../search/result-section/result-section.model';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient, private configService: ConfigurationService) { }

  getUniProtSummary(uniprotAccession: string): Observable<any> {
    return this.httpClient.get<SummaryResponse>(this.configService.getUniProtSummaryUrl() + uniprotAccession + '.json');
  }
}
