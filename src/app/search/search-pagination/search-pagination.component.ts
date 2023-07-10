import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-search-pagination',
  templateUrl: './search-pagination.component.html',
  styleUrls: ['./search-pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPaginationComponent {
  @Input()  paginationData: any;
  @Output() paginationDataChange = new EventEmitter<any>();
 
  @Output()
  selectedPage:EventEmitter<Object> = new EventEmitter();

  constructor() { }

  paginateTo(pageIndex, source){
    this.selectedPage.emit({pageIndex: pageIndex, source: source});
  }
}