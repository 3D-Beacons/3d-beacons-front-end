import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { SearchService } from '../search/search.service';
import { SummaryResponse as SummaryResponse } from './result-section.model';
import { SummaryService } from './summary-section/summary-section.service';

@Component({
  selector: 'app-result-section',
  templateUrl: './result-section.component.html',
  styleUrls: ['./result-section.component.css']
})
export class ResultSectionComponent implements OnInit, OnDestroy {
  summaryData: any[];
  resultData = null;
  haveResults = false;
  resultSubscription: Subscription;

  constructor(
    private searchService: SearchService,
    private summaryService: SummaryService) { }

  ngOnInit(): void {
    this.resultSubscription = this.searchService.result.subscribe(data => {
      if (data) {
        this.haveResults = true;
        this.resultData = data;
        this.summaryData = this.prepareSummaryData(data);
      } else {
        this.haveResults = false;
        this.resultData = null;
        this.summaryData = [];
      }
    });
  }

  prepareSummaryData(resultData: SummaryResponse) {
    let categories = this.summaryService.getCategories();

    resultData.structures.map((structure) => {
      let categoryId = this.summaryService.getProviderCategory(structure.provider);
      let category = categories[categoryId];

      if (!category.count) {
        category.count = 0;
      }
      category.count++;
    });

    let tempList = [];
    for (let c in categories) {
      tempList.push(categories[c]);
    }
    return tempList;
  }

  ngOnDestroy() {
    this.resultSubscription.unsubscribe();
  }

}
