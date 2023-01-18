import { Injectable } from '@angular/core';
import { DataService } from '../core/data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SequenceService {

  constructor(private dataService: DataService) { }

  getSequenceSearchResult(jobId: string): Observable<any> {
    return this.dataService.getSequenceSearchResult(jobId);
  }
}
