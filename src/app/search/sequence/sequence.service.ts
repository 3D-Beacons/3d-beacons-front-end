import { Injectable } from '@angular/core';
import { DataService } from '../../core/data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SequenceService {
  searchTermValue: string = '';

  constructor(private dataService: DataService) { }

  setSearchTermValue(searchterm){
    this.searchTermValue = searchterm;
  }

  getSequenceSearchResult(jobId: string): Observable<any> {
    return this.dataService.getSequenceSearchResult(jobId);
  }
}
