import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SummaryResponse } from './result-section/result-section.model';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {
  searchForm: FormGroup = new FormGroup({
    searchTerm: new FormControl(null, Validators.required)
  });

  error: string = null;
  resultData: SummaryResponse;
  isFetching: boolean = false;
  exampleAccessions: string[] = ['P0DTD1', 'P38398'];

  constructor(private searchService: SearchService) { }

  onSearch(query?: string) {
    if (query == undefined) {
      query = this.searchForm.controls.searchTerm.value;
    } else {
      this.searchForm.controls.searchTerm.setValue(null);
    }
    this.isFetching = true;
    this.searchForm.disable();
    this.error = null;
    this.searchService.getUniProtSummary(query).subscribe(
      data => {
        console.log('Received summary response', data);
        this.resultData = data;
        this.isFetching = false;
        this.searchForm.enable();
      },
      err => {
        this.error = 'No data found!';
        this.isFetching = false;
        this.searchForm.enable();
        this.resultData = null;
      });
  
}

}
