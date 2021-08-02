import { Component, Input } from '@angular/core';

import { SummaryService } from './summary-section/summary-section.service';

@Component({
  selector: 'app-result-section',
  templateUrl: './result-section.component.html',
  styleUrls: ['./result-section.component.css']
})
export class ResultSectionComponent {
  summaryData: any[];
  private _resultData: any;
  haveResults = false;

  @Input()
  get resultData(): any {
    return this._resultData;
  }
  set resultData(data: any) {
    this._resultData = data;
    if (data) {
      this.haveResults = true;
      this.summaryData = this.prepareSummaryData();
    } else {
      this.haveResults = false;
    }
  }

  constructor(private summaryService: SummaryService) { }

  getSum(): number {
    let sum = 0;
    this.summaryData.forEach(item => {
      if (item.count) {
        sum += item.count;
      }
    });
    return sum;
  }

  prepareSummaryData() {
    const categories = this.summaryService.getCategories();

    this.resultData.structures.map((structure) => {
      const categoryId = this.summaryService.getProviderCategory(structure.provider);
      const category = categories[categoryId];

      if (!category.count) {
        category.count = 0;
      }
      category.count++;
    });

    const tempList = [];
    for (let c in categories) {
      tempList.push(categories[c]);
    }

    return tempList;
  }

}
