import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from '../core/data.service';
import { SummaryResponse } from './result-section/result-section.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private dataService: DataService) { }

  getUniProtSummary(uniprotAccession: string): Observable<SummaryResponse> {
    return this.dataService.getUniProtSummary(uniprotAccession);
  }
}