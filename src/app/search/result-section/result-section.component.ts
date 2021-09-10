import { Component, Input } from '@angular/core';
import { ConfigurationService } from 'src/app/core/configuration.service';
import { InfoText } from './info-text.model';

import { SummaryService } from './summary-section/summary-section.service';
import { UniProtEntry } from './uniprot-data.model';

@Component({
  selector: 'app-result-section',
  templateUrl: './result-section.component.html',
  styleUrls: ['./result-section.component.css']
})
export class ResultSectionComponent {
  summaryData: any[];
  private _resultData: any;
  haveResults = false;
  private _entryData: UniProtEntry;
  infoText: any[];
  textLimit = 30;

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

  @Input()
  get entryData(): UniProtEntry {
    return this._entryData;
  }
  set entryData(data: UniProtEntry) {
    this._entryData = data;
    if (data) {
      this.infoText = this.prepareInfoText(data);
    } else {

    }
  }


  constructor(private summaryService: SummaryService, private configService: ConfigurationService) { }

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

  prepareInfoText(data) {
    let infoText = [];

    if (data.protein.recommendedName) {
      infoText.push(
        {
          label: 'Protein',
          text: data.protein.recommendedName.fullName.value,
          italic: false,
          show_long: true,
          source: '',
          source_url: ''
        }
      );
    }
    if (data.id) {
      const geneName = data.gene ? data.gene[0].name.value : 'Not available';
      infoText.push(
        {
          label: 'Gene',
          text: geneName,
          italic: false,
          show_long: true,
          source: '',
          source_url: ''
        }
      );
    }
    if (data.organism) {
      let scientificNames = data.organism.names.filter(name => name.type === 'scientific')
      infoText.push(
        {
          label: 'Source organism',
          text: scientificNames ? scientificNames[0].value : 'Not available',
          italic: true,
          show_long: true,
          source: '',
          source_url: ''
        }
      );
    }
    if (data.uniprotAccession) {
      infoText.push(
        {
          label: 'UniProt',
          text: data.uniprotAccession,
          italic: false,
          show_long: true,
          source: 'UniProt',
          source_url: this.configService.getUniProtApiUrl() + data.uniprotAccession
        }
      );
    }

    // Default biological function text
    const bioFunction: InfoText = {
      label: 'Biological function',
      text: 'Not available',
      italic: false,
      show_long: false,
      source: 'UniProt',
      source_url: 'https://www.uniprot.org/uniprot/'
    };
    let catalyticActivity: string;
    // Set biological function and catalytic activity
    if (data.comments) {
      data.comments.forEach(comment => {
        if (comment.type === 'FUNCTION') {
          bioFunction.text = comment.text[0].value;
        }
        if (comment.type === 'CATALYTIC_ACTIVITY') {
          catalyticActivity = comment.reaction.name;
        }
      });
      bioFunction.text += '.';
    }
    bioFunction.source_url += data.accession;
    if (bioFunction.text === 'Not available' && catalyticActivity !== '') {
      bioFunction.text = 'Catalytic activity: ' + catalyticActivity;
    }
    if (bioFunction.text !== 'Not available') {
      const pubmed = 'PubMed:([0-9]+)';
      const re = new RegExp(pubmed, 'g');
      bioFunction.text = bioFunction.text.replace(re, '<a href="https://www.uniprot.org/citations/$1" target="_blank">PubMed:$1</a>');
    }
    infoText.push(bioFunction);

    return infoText;

  }

  /**
   * Cuts the text to a specified number of words and add ... if needed
   * @param text - any text to be displayed
   */
  getShortenedText(text: string): string {
    if (!text) {
      return;
    }
    const words = text.split(' ');
    if (words.length <= this.textLimit) {
      return text;
    }
    const wordSubset = words.slice(0, this.textLimit);
    return wordSubset.join(' ') + ' ...';
  }

  /**
   * Toggle if a text should be shown completely or only in a shortened
   * version
   * @param text - a text object that has a .show_long attribute
   */
  switchText(text: InfoText): boolean {
    text.show_long = !text.show_long;
    return text.show_long;
  }

  /**
   * Check if a text is longer than the limit
   * @param text - a text object
   */
  checkIfHasToShowMore(text: InfoText): boolean {
    const words = text.text.split(' ');
    return !text.show_long && words.length >= this.textLimit;
  }

}
