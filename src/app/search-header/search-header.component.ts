import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SummaryResponse } from '../search/result-section/result-section.model';
import { SearchService } from '../search/search.service';
import { UniProtEntry } from '../search//result-section/uniprot-data.model';
import { SequenceService } from '../search/sequence/sequence.service';

declare var gtag;

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css']
})
export class SearchHeaderComponent implements OnInit  {

  searchTerm = new FormControl(null, Validators.required);
  searchBy = 'UniProt accession';

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
    private router: Router, 
    private searchService: SearchService,
    private sequenceService: SequenceService
  ) {
    const navEndEvent$ = router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    );
    navEndEvent$.subscribe((e: NavigationEnd) => {
      gtag(
        'config',
        environment.gaTag,
        {page_path: e.urlAfterRedirects});
    });
    const headerScript = document.createElement('script');
    headerScript.async = true;
    headerScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + environment.gaTag;
    document.head.appendChild(headerScript);
  }

  ngOnInit() {
    // this.onSearch('P38398');
  }

  onSearch(e) {
    e.preventDefault();
    this.searchService.setSearchTermValue(this.searchTerm.value);
    this.searchService.setSearchByValue(this.searchBy);
    
    if (!this.searchTerm.value || this.searchTerm.value.trim() === '') {
      return;
    }
    var searchTerm = this.searchTerm.value.toUpperCase();
    const mapSearch = this.searchBy.replace(/\W/g, '').toLowerCase(); 

    if(mapSearch == "sequence"){
      this.doSequenceSearch(searchTerm);
    }else if(mapSearch === "ensemblidentifier"){

      this.router.navigate(['/ensembl/', searchTerm]);
    }
    else{
      this.router.navigate(['/search/', searchTerm]);
    }
  }

  doSequenceSearch(query?: string) {
    this.isFetching = true;
    this.isSequenceSearch = true;
    //this.sequence = params.id;
    setTimeout(() => {}, 2000);
    //this.searchForm.disable();
    this.sequenceService.setSearchTermValue(query);

    this.searchService.submitSequenceSearch(query).subscribe(
      response => {
        var jobId = response.job_id;
        localStorage[jobId] = query;
        this.isFetching = false;
        this.router.navigate(['sequence', jobId]);
      },
      err => {
        this.isFetching = false;
       // window.location.reload()
        this.handleError("No data found!");
      }
    )
  }

  handleError(message: string): void {
    this.error = message;
    this.isSequenceSearch = false;
    this.isFetching = false;
    //this.searchForm.enable();
    this.resultData = null;
  }
}
