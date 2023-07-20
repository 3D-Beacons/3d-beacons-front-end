import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SearchPaginationComponent } from '../../search-pagination/search-pagination.component';

@Component({
  selector: 'app-sequence-cards',
  templateUrl: './sequence-cards.component.html',
  styleUrls: ['./sequence-cards.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SequenceCardsComponent implements OnInit {
  @Input() res: any;

  isShowingAll: boolean = false;
  islinkShow: boolean = false;
  isLinkedClicked: boolean = false;
  canShowSingle: boolean = true;
  canShowAll: boolean = false;
  showfullclass: string = '';
  showlessclass: string = '';
 
  constructor() { }

  ngOnInit() {
    if(this.res && this.res.query_sequence.length > 60){
      this.isShowingAll = true;
    }
  }

  getLabelValue(label, stats) {
    let valueoflable = null; 
    for (const stat of stats) {
      // Check if the label matches the label of the current match stat
      if (stat.label === label) {
        valueoflable = stat.value;
      }
    }
    return valueoflable;
  }

  switchText(){
    this.isLinkedClicked ? this.isLinkedClicked = false : this.isLinkedClicked = true;
    this.canShowSingle = false;
    if(this.isShowingAll) {
      this.isShowingAll = false;
    }else{
      this.isShowingAll = true;
    }
  }

  switchTexttoFull(){
    this.isLinkedClicked ? this.isLinkedClicked = false : this.isLinkedClicked = true;
    this.canShowSingle = false;
    this.canShowAll = true;
    if(this.isShowingAll) {
      this.isShowingAll = false;
    }else{
      this.isShowingAll = true;
    }
  }

  switchTexttoLess(){
    this.isLinkedClicked ? this.isLinkedClicked = false : this.isLinkedClicked = true;
    this.canShowSingle = true;
    this.canShowAll = false;
    if(this.isShowingAll) {
      this.isShowingAll = false;
    }else{
      this.isShowingAll = true;
    }
  }

  greaterThanLimit(query){
    const isGreater = query.length <= 60 ? false : true;
    return isGreater;

  }

  getStringsChunks(query, chunk_size = 60) {
    if(query.length < 60){
      this.isShowingAll = true;
      this.islinkShow = true;
    }

    let chunks = [];
    let index = 1;
    const queries = query.match(/.{1,60}/g);
    // Instead of using the `while` loop, we can use the `for` loop to iterate over the `queries` array.
    for (let query of queries) {
      let counttoshow;
      if (query.length < chunk_size) {
        counttoshow = query.length
      } else {
        counttoshow = chunk_size
      }
      chunks.push({
        "start": index * chunk_size - chunk_size + 1,
        "query_chunk": query,
        "counttoshow": (index-1)*chunk_size + counttoshow,
      })
      index += 1
    }
    return chunks;
  }
}
