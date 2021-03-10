import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ConfigurationService } from '../core/configuration.service';
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
  resultData: SummaryResponse = null;
  isFetching: boolean = false;
  exampleAccessions: string[];

  constructor(private searchService: SearchService, private configService: ConfigurationService) { }

  ngOnInit() {
    this.exampleAccessions = this.configService.getExampleAccessions();
  }

  onSearch(query?: string) {
    if (query == undefined) {
      query = this.searchForm.controls.searchTerm.value;
    } else {
      this.searchForm.controls.searchTerm.setValue(null);
    }
    this.isFetching = true;
    this.searchForm.disable();
    this.error = null;
    this.searchService.getUniProtEntry(query).subscribe(
      entryData => {
        console.log('Received UniProt entry response', entryData);
        this.searchService.getUniProtSummary(query).subscribe(
          summaryData => {
            console.log('Received summary response', summaryData);
            let tempSummaryData: SummaryResponse = summaryData;
            tempSummaryData.uniprot_entry.sequence_length = entryData.sequence.length;
            tempSummaryData.uniprot_entry.sequence = entryData.sequence.sequence;
            tempSummaryData.uniprot_entry.id = entryData.id;
            this.isFetching = false;
            this.searchForm.enable();
            this.resultData = tempSummaryData;
          },
          err => {
            this.handleError();
          });
      },
      err => {
        this.handleError();
      }
    );
  }

  handleError(): void {
    this.error = 'No data found!';
    this.isFetching = false;
    this.searchForm.enable();
    this.resultData = null;
  }

}
