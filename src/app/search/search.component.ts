import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {ConfigurationService} from '../core/configuration.service';
import { Overview, Structure, SummaryResponse} from './result-section/result-section.model';
import {SearchService} from './search.service';
import {ActivatedRoute, Router} from '@angular/router';
import { UniProtEntry } from './result-section/uniprot-data.model';
import { SearchHeaderComponent } from '../search-header/search-header.component';
import { SequenceService } from './sequence/sequence.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({
    searchTerm: new FormControl(null, Validators.required)
  });
  searchBy: string;
  searchTermValue: string;

  accession: string;
  private sub: any;
  error: string = null;
  resultData: SummaryResponse = null;
  isFetching: boolean = false;
  exampleAccessions: string[];
  entryData: UniProtEntry = null;
  sequence: string = null;
  isSequenceSearch: boolean = false;
  isEnsembl: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private sequenceService: SequenceService,
    private configService: ConfigurationService,
    private router: Router) {
  }

  ngOnInit() {
    this.sequenceService.setSearchTermValue(this.searchForm.controls.searchTerm.value);
    this.searchBy = this.searchService.getSearchByValue();
    this.sub = this.route.params.subscribe(params => {
      if(params.id){
        this.accession = params.id;
        this.doAccessionSearch(this.accession);
      }else{
        return;
      }
    });
    this.exampleAccessions = this.configService.getExampleAccessions();
    // this.onSearch('P38398');
  }

  isUniprotAccession(term: string): boolean {
    return RegExp('^[OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9]([A-Z][A-Z0-9]{2}[0-9]){1,2}$').test(term);
  }

  doAccessionSearch(query?: string) {
    this.searchTermValue = query;
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
        this.entryData = entryData;
        this.searchService.getUniProtSummary(query).subscribe(
          summaryData => {
            let tempSummaryData: SummaryResponse = summaryData;
            tempSummaryData.uniprot_entry.sequence_length = entryData.sequence.length;
            tempSummaryData.uniprot_entry.sequence = entryData.sequence.sequence;
            tempSummaryData.uniprot_entry.id = entryData.id;
            this.isFetching = false;
            this.searchForm.enable();
            this.resultData = tempSummaryData;
            this.isSequenceSearch = false;
          },
          err => {
            this.isFetching = false;
            this.isSequenceSearch = false;
            this.handleError("No Uniprot summary data found!");
          });
      },
      err => {
        this.isFetching = false;
        this.handleError("No Uniprot entry data found!");
      }
    );
  }

  handleError(message: string): void {
    this.error = message;
    this.isSequenceSearch = false;
    this.isFetching = false;
    this.searchForm.enable();
    this.resultData = null;
  }

}
