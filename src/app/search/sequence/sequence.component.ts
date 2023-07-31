import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { SequenceService } from './sequence.service';
import { SequenceDataFormatterService } from './sequence-data-formatter.service';

import { Hit } from './search-result.model';
import { MatPaginator } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { SearchService } from '../search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sequence',
  templateUrl: './sequence.component.html',
  styleUrls: ['./sequence.component.css']
})
export class SequenceComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  job_id: string;
  is_searchprogress: boolean = false;
  isCopySequence: boolean = false;
  isCopyLink: boolean = false;
  is_noresult: boolean = false;
  showErrorNoJobid: boolean = false;
  message: string = null;
  searching: boolean = false;
  resultData: Hit[] = null;
  cardData = null;
  card_data_length = 0;
  tableSource: MatTableDataSource<Hit> = new MatTableDataSource<Hit>();
  displayedColumns: string[] = ['accession', 'id', 'description', 'struct_count', 'hsp_align_length', 'hsp_identity'];
  subTimeout:any;
  seqResultsRequest: Subscription;
 
  localStorageSearchTerm: string;
  searchTerm: string;
  paginationData: any  = {
    perPage: 10, currentPage: 1, totalPages: 0, pages: [], totalRecords: 0
  };
  cardDataChunk: [];
  searchTermValue: string;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private sequenceService: SequenceService,
    private sequenceDataFormatterService: SequenceDataFormatterService,
    private titleService: Title,
    private changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.searchTermValue = this.searchService.searchTermValue;
    this.paginationData.pages = this.visiblePageNumbers();
    this.sub = this.route.params.subscribe(params => {
      if(params.id === "" || params.id === undefined || params.id === null){
        this.job_id = "";
        this.message = "Error in submitting the job";
        this.showErrorNoJobid = true;
        this.is_noresult = false;
        return;
      }else{
        this.is_noresult = false;
        this.showErrorNoJobid = false;
        this.job_id = params.id;
        this.searchTerm = params.id;
        this.localStorageSearchTerm = localStorage[this.job_id];
        this.is_searchprogress = true;
        this.getSequenceData(this.job_id);
      }
    });
  }

  getSequenceData(jobId){
    if(jobId){
        this.is_noresult = false;
        this.seqResultsRequest = this.sequenceService.getSequenceSearchResult(jobId).subscribe(
          response => {
            let message = response.message;
            if (message && message.startsWith("Search in progress")) {
              this.message = "Search in progress";
              this.is_searchprogress = true;
              this.is_noresult = false;
              this.titleService.setTitle("Search in progress");
              this.searching = true;
              this.subTimeout = setTimeout(() => {this.getSequenceData(this.job_id);}, 30000);
            } else {
              this.searching = false;
              this.is_noresult = false;
              this.titleService.setTitle("3D-Beacons");
              this.is_searchprogress = false;
              this.changeDetectorRef.markForCheck();
              this.cardData = this.sequenceDataFormatterService.formatData(response);
              this.cardDataChunk = this.getSlice(this.paginationData.currentPage)
              this.card_data_length = this.cardData.length;

              this.paginationData.totalPages = Math.ceil(this.card_data_length / this.paginationData.perPage);
              this.paginationData.totalRecords = this.card_data_length;
              this.paginationData.pages = this.visiblePageNumbers();
              this.paginationData = Object.assign({}, this.paginationData);
            }
          },
          err => {
            this.searching = false;
            this.is_searchprogress = false;
            this.is_noresult = true;
            this.cardData = null;
            this.message = "No results found for this sequence!";
          }
        );
    }else{
      return;
    }
  }

  getSlice(currentPage){
    const start = currentPage * this.paginationData.perPage - this.paginationData.perPage;
    const end = currentPage * this.paginationData.perPage;
    return this.cardData.slice(start,end);
  }
  
  copySequence(sequence) {
    navigator.clipboard.writeText(sequence);
    this.isCopySequence = true;
    setTimeout(() => {this.isCopySequence = false;}, 5000);
  }

  copyLink() {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    this.isCopyLink = true;
    setTimeout(() => {this.isCopyLink = false;}, 5000);   
  }

  visiblePageNumbers(): any[] {
    const innerWindow = 1;
    const outerWindow = 0;
    let windowFrom = this.paginationData.currentPage - innerWindow;
    let windowTo = this.paginationData.currentPage + innerWindow;

    // If the window is truncated on one side, make the other side longer
    if (windowTo > this.paginationData.totalPages) {
      windowFrom = Math.max(0, windowFrom - (windowTo - this.paginationData.totalPages));
      windowTo = this.paginationData.totalPages;
    }
    if (windowFrom < 1) {
      windowTo = Math.min(this.paginationData.totalPages, windowTo + (1 - windowFrom));
      windowFrom = 1;
    }

    let visible = [];

    // Always show the first page
    visible.push(1);
    // Don't add inner window pages twice
    for (let i = 2; i <= Math.min(1 + outerWindow, windowFrom - 1); i++) {
      visible.push(i);
    }
    // If the gap is just one page, close the gap
    if (1 + outerWindow == windowFrom - 2) {
      visible.push(windowFrom - 1);
    }
    // Don't add the first or last page twice
    for (var i = Math.max(2, windowFrom); i <= Math.min(windowTo, this.paginationData.totalPages - 1); i++) {
      visible.push(i);
    }
    // If the gap is just one page, close the gap
    if (this.paginationData.totalPages - outerWindow == windowTo + 2) {
      visible.push(windowTo + 1);
    }
    // Don't add inner window pages twice
    for (let i = Math.max(this.paginationData.totalPages - outerWindow, windowTo + 1); i < this.paginationData.totalPages; i++) {
      visible.push(i);
    }
    // Always show the last page, unless it's the first page
    if (this.paginationData.totalPages > 1) {
      visible.push(this.paginationData.totalPages);
    }

    var links = [];

    let prev = null;

    for (let i = 0, l = visible.length; i < l; i++) {
      if (prev && visible[i] > prev + 1) {
        links.push(-1);
      }
      links.push(visible[i]);
      prev = visible[i];
    }
    return links;
  }

  paginateTo(paginate): void {
    if (paginate.source == 'arrow'){
     if (paginate.pageIndex == -1 && this.paginationData.currentPage == 1) { return; }
      if (paginate.pageIndex == 1 && this.paginationData.currentPage == this.paginationData.totalPages) { return; }

      this.paginationData.currentPage = this.paginationData.currentPage + paginate.pageIndex;

    }else{
      if (this.paginationData.currentPage == paginate.pageIndex) { return; }
      this.paginationData.currentPage = paginate.pageIndex;
    }

    this.paginationData.pages = this.visiblePageNumbers();
    this.paginationData = Object.assign({}, this.paginationData);
    this.cardDataChunk = this.getSlice(this.paginationData.currentPage)
  }

  updatePerPageVal(ppgSelected: any): void {
    // Reset to page 1
    this.paginationData.currentPage = 1;
    this.paginationData.perPage = ppgSelected.ppgValue;
    this.paginationData.pages = this.visiblePageNumbers();
    this.paginationData = Object.assign({}, this.paginationData);

  }

  getResultCountText(): string{
    let title = '0 results';
    if (this.paginationData.totalRecords > 0) {
      const ppVal = this.paginationData.perPage;
      const fromVal = ((this.paginationData.currentPage - 1) * ppVal) + 1;
      let toVal = ((this.paginationData.currentPage - 1) * ppVal) + ppVal;
      if (this.paginationData.currentPage == this.paginationData.totalPages){
        toVal = this.paginationData.totalRecords;
      }
      title = `${fromVal} - ${toVal} of ${this.paginationData.totalRecords} results`;
    }
    return title;
  }

  ngOnDestroy(): void {
    this.job_id = "";
    this.cardData = null;
    this.is_noresult = false;
    this.is_searchprogress = false;
  }
}
