import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from '../core/data.service';
import { SummaryResponse } from './result-section/result-section.model';
import { UniProtEntry } from './result-section/uniprot-data.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchTermValue: string = '';
  searchByValue: string = '';

  constructor(private dataService: DataService) { }

  setSearchTermValue(searchterm){
    this.searchTermValue = searchterm;
  }

  getSearchByValue(){
    return this.searchByValue;
  }
  setSearchByValue(searchby){
    this.searchByValue = searchby;
  }

  getUniProtSummary(uniprotAccession: string): Observable<SummaryResponse> {
    return this.dataService.getUniProtSummary(uniprotAccession);
  }

  getUniProtEntry(uniprotAccession: string): Observable<UniProtEntry> {
    return this.dataService.getUniProtEntry(uniprotAccession);
  }

  submitSequenceSearch(sequence: string): Observable<any> {
    return this.dataService.submitSequenceSearch(sequence);;
  }

  submitEnsemblSearch(ensmblid: string): Observable<UniProtEntry> {
    return this.dataService.getEnsemblSearchResult(ensmblid);
  }
}