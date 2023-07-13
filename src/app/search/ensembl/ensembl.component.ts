import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../search.service';
import { SequenceService } from '../sequence/sequence.service';
import { EnsemblDataFormatterService } from './ensembl-data-formatter.service';
import { SequenceCardsComponent } from '../sequence/sequence-cards/sequence-cards.component'

import { MatPaginator } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-ensembl',
  templateUrl: './ensembl.component.html',
  styleUrls: ['./ensembl.component.css']
})
export class EnsemblComponent {
  private sub: any;
  ensembl_id: string;
  message: string = null;
  is_searchprogress: boolean = false;
  is_noresult: boolean = false;
  searching: boolean = false;
  ensembl_results = null;
  ensembl_results_length = 0;
  cardData = null;
  card_data_length = 0;
  isFetching: boolean = false;
  
  searchTerm: string;
  paginationData: any  = {
    perPage: 10, currentPage: 1, totalPages: 3, pages: [], totalRecords: 3
  };

  cardDataChunk: [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private route: ActivatedRoute,
    private sequenceService: SequenceService,
    private searchService: SearchService,
    private ensemblDataFormatterService: EnsemblDataFormatterService,
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.searchTerm = this.searchService.searchTermValue;
    this.is_searchprogress = true;
    this.isFetching = true;
    this.message = "Search in progress";
    this.paginationData.pages = this.visiblePageNumbers();
    this.sub = this.route.params.subscribe(params => {
      this.ensembl_id = params.id;
      this.searchTerm = params.id;
      this.searchService.submitEnsemblSearch(this.ensembl_id).subscribe(
        response => {
          this.searching = false;
          this.is_searchprogress = false;
          this.isFetching = false;
          this.message = '';
          this.is_noresult = false;
          this.titleService.setTitle("3D-Beacons");

          this.cardData = this.ensemblDataFormatterService.formatData(response);
          this.cardDataChunk = this.getSlice(this.paginationData.currentPage);
          this.card_data_length = this.cardData.length;

          this.paginationData.totalPages = Math.ceil(this.card_data_length / this.paginationData.perPage);
          this.paginationData.totalRecords = this.card_data_length;
          this.paginationData.pages = this.visiblePageNumbers();
          this.paginationData = Object.assign({}, this.paginationData);
        },
        err => {
          this.isFetching = false;
          this.searching = false;
          this.is_searchprogress = false;
          this.is_noresult = true;
          this.message = "No results found for this ENSEMBL id!";
        }
      )
    });
  }
  
  copyToClipboard(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }

  copyLink() {
    const link = window.location.href;
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (link));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }

  getSlice(currentPage){
    const start = currentPage * this.paginationData.perPage - this.paginationData.perPage;
    const end = currentPage * this.paginationData.perPage;
    return this.cardData.slice(start,end);
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
    this.cardDataChunk = this.getSlice(this.paginationData.currentPage);
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
}
