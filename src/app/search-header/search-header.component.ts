import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ConfigurationService } from '../core/configuration.service';
import { SummaryResponse } from '../search/result-section/result-section.model';
import { SearchService } from '../search/search.service';
import { UniProtEntry } from '../search//result-section/uniprot-data.model';
import { SearchComponent } from '../search/search.component';
import { SequenceService } from '../search/sequence/sequence.service';

declare var gtag;

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css']
})
export class SearchHeaderComponent implements OnInit  {

  searchTerm = new FormControl(null, Validators.required);
  searchBy = 'uniprotaccession';

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
    private route: ActivatedRoute,
    private configService: ConfigurationService,
    private sequenceService: SequenceService,
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
    const searchComponent = new SearchComponent(this.route, this.searchService, this.sequenceService, this.configService, this.router);
    this.searchService.setSearchTermValue(this.searchTerm.value);
    this.searchService.setSearchByValue(this.searchBy);

    if (this.searchTerm.value.trim() === '') {
      return;
    }
    // this.router.navigate(['/search/', this.searchTerm.value]);
    var searchTerm = this.searchTerm.value.toUpperCase();
    if(this.searchBy == "sequencesearch"){
      this.doSequenceSearch(searchTerm);
    }else if(this.searchBy === "ensemblesearch"){
      //this.sequenceService.setSearchTermValue(this.searchTerm.value);
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
