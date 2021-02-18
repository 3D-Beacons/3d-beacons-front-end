import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SummaryResponse } from './result-section/result-section.model';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({
    searchTerm: new FormControl(null, Validators.required)
  });

  error: string = null;
  resultData: SummaryResponse;
  isFetching: boolean = false;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {}

  onSearch() {
    this.isFetching = true;
    this.error = null;
    this.searchService.getUniProtSummary(this.searchForm.controls.searchTerm.value).subscribe(
      data => {
        this.resultData = data;
        this.isFetching = false;
      },
      err => {
        this.error = 'No data found!';
        this.isFetching = false;
        this.resultData = null;
      });
  
}

}
