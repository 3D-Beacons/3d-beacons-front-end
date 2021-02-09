import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SummaryResponse } from '../result-section/result-section.model';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchForm: FormGroup = new FormGroup({
    searchTerm: new FormControl(null, Validators.required)
  });
  errorSubscription: Subscription;
  resultSubscription: Subscription;
  error: string = null;
  resultData: SummaryResponse;
  isFetching: boolean = false;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.errorSubscription = this.searchService.error.subscribe(error => {
      if (error.status === 404) {
        this.error = "No data found!";
      }
    });
    this.resultSubscription = this.searchService.result.subscribe(result => {
      this.resultData = result;
      this.isFetching = false;
    });
  }

  onSearch() {
    this.isFetching = true;
    this.error = null;
    this.searchService.getUniProtSummary(this.searchForm.get('searchTerm').value);
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
    this.resultSubscription.unsubscribe();
  }

}
