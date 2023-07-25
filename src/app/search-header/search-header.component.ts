import { Component, OnInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SummaryResponse } from '../search/result-section/result-section.model';
import { SearchService } from '../search/search.service';
import { UniProtEntry } from '../search//result-section/uniprot-data.model';
import { SequenceService } from '../search/sequence/sequence.service';
import { Subscription } from 'rxjs';

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
  showLoader: boolean = false;
  exampleAccessions: string[];
  entryData: UniProtEntry = null;
  sequence: string = null;
  totalTry: number = 0;
  routeSubscriber: Subscription;
  
  constructor(
    private router: Router, 
    private searchService: SearchService,
    private sequenceService: SequenceService,
    private changeDetectorRef: ChangeDetectorRef,
    private el:ElementRef,
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
    this.routeSubscriber = this.router.events.subscribe(val => {
      if (val instanceof RoutesRecognized) {
        const currentParams = val.state.root.firstChild.params;
        const paramLength = Object.keys(currentParams).length;
        const currentUrl = window.location.pathname;
        if(currentUrl.includes("/sequence") && paramLength === 1){
          this.el.nativeElement.querySelector('.search-input-field').value = localStorage[currentParams.id];
          this.el.nativeElement.querySelector('.category-select').value = 'sequence';
          this.searchBy = 'sequence';
          this.changeDetectorRef.detectChanges();
        }
        if(paramLength === 0) {
          this.el.nativeElement.querySelector('.search-input-field').value = '';
          this.el.nativeElement.querySelector('.category-select').value = 'UniProt accession';
          this.searchBy = 'UniProt accession';
          this.changeDetectorRef.detectChanges();
        }
      }
    });
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
    this.showLoader = true;
    setTimeout(() => {}, 2000);
    this.sequenceService.setSearchTermValue(query);
      this.searchService.submitSequenceSearch(query).subscribe(
        response => {
          this.totalTry = 0;
          const jobId = response.job_id;
          localStorage[jobId] = query;
          this.showLoader = false;
          this.changeDetectorRef.markForCheck();
          this.router.navigate(['sequence', jobId]);
        },
        err => {
          this.totalTry++;
          if(this.totalTry < 3){
            this.showLoader = false;
            this.changeDetectorRef.markForCheck();
            this.doSequenceSearch(query);
          }
          else{
            this.totalTry = 0;
            this.showLoader = false;
            this.changeDetectorRef.markForCheck();
            this.router.navigate(['sequence']); 
          }
         
        }
      )
  }
}
