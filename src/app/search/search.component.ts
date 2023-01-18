import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {ConfigurationService} from '../core/configuration.service';
import {SummaryResponse} from './result-section/result-section.model';
import {SearchService} from './search.service';
import {ActivatedRoute, Router} from '@angular/router';
import { UniProtEntry } from './result-section/uniprot-data.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup = new FormGroup({
    searchTerm: new FormControl(null, Validators.required)
  });

  accession: string;
  private sub: any;
  error: string = null;
  resultData: SummaryResponse = null;
  isFetching: boolean = false;
  exampleAccessions: string[];
  entryData: UniProtEntry = null;
  sequence: string = null;
  isSequenceSearch: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private configService: ConfigurationService,
    private router: Router) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (this.isUniprotAccession(params.id)) {
        this.accession = params.id;
        this.doAccessionSearch(this.accession);
      } else {
        this.isSequenceSearch = true;
        this.sequence = params.id;
        this.doSequenceSearch(this.sequence);
      }      
    });


    this.exampleAccessions = this.configService.getExampleAccessions();
    // this.onSearch('P38398');
  }

  isUniprotAccession(term: string): boolean {
    return RegExp('^[OPQ][0-9][A-Z0-9]{3}[0-9]|[A-NR-Z][0-9]([A-Z][A-Z0-9]{2}[0-9]){1,2}$').test(term);
  }

  doAccessionSearch(query?: string) {
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
        console.debug('Received UniProt entry response', entryData);
        this.entryData = entryData;
        this.searchService.getUniProtSummary(query).subscribe(
          summaryData => {
            console.debug('Received summary response', summaryData);
            let tempSummaryData: SummaryResponse = summaryData;
            tempSummaryData.uniprot_entry.sequence_length = entryData.sequence.length;
            tempSummaryData.uniprot_entry.sequence = entryData.sequence.sequence;
            tempSummaryData.uniprot_entry.id = entryData.id;
            this.isFetching = false;
            this.searchForm.enable();
            this.resultData = tempSummaryData;
          },
          err => {
            this.handleError("No Uniprot summary data found!");
          });
      },
      err => {
        this.handleError("No Uniprot entry data found!");
      }
    );
  }

  doSequenceSearch(query?: string) {
    this.searchService.submitSequenceSearch(query).subscribe(
      response => {
        var jobId = response.job_id;
        this.router.navigate(['/sequence', jobId]);
      },
      err => {
        this.handleError("No data found!");
      }
    )
  }


  handleError(message: string): void {
    this.error = message;
    this.isFetching = false;
    this.searchForm.enable();
    this.resultData = null;
  }

}
