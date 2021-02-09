import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

import { environment } from '../../environments/environment';
import { SummaryResponse } from '../result-section/result-section.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  error = new Subject<HttpErrorResponse>();
  result = new Subject<SummaryResponse>();
  apiHost = environment.apiHost;

  constructor(private httpClient: HttpClient) { }

  getUniProtSummary(searchTerm: string) {
      this.httpClient.get<SummaryResponse>(this.apiHost +'/uniprot/summary/' +searchTerm +'.json')
        .subscribe(responseData => {
          this.result.next(responseData);
          console.log('SearchService: Response received for ', searchTerm, responseData);
        },
        error => {
          this.error.next(error);
          this.result.next(null);
        });
    }
}
