import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import { SummaryResponse } from '../search/result-section/result-section.model';
import { UniProtEntry } from '../search/result-section/uniprot-data.model';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrls = {};

  constructor(private http: HttpClient, private httpClient: HttpClient, private configService: ConfigurationService) { }

  getUniProtSummary(uniprotAccession: string): Observable<any> {
    return this.httpClient.get<SummaryResponse>(this.configService.getUniProtSummaryUrl() + uniprotAccession + '.json');
  }

  getUniProtEntry(uniprotAccession: string): Observable<any> {
    return this.httpClient.get<UniProtEntry>(this.configService.getUniProtApiUrl() + uniprotAccession);
  }

  submitSequenceSearch(sequence: string): Observable<any> {
    return this.httpClient.post(this.configService.getSequenceSearchUrl(), {"sequence": sequence});
  }

  getSequenceSearchResult(jobId: string): Observable<any> {
    return this.httpClient.get(this.configService.getSequenceSearchResultUrl() +'?job_id=' + jobId);
  }

  getEnsemblSearchResult(ensemblid: string): Observable<any> {
    return this.httpClient.get(this.configService.getEnsemblSearchResultUrl() + ensemblid + '.json');
  }

}
