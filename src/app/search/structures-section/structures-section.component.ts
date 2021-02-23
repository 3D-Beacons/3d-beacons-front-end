import { Component, Input, OnInit } from '@angular/core';

import { ConfigurationService } from 'src/app/core/configuration.service';
import * as pvFormat from '../result-section/protvista.model';
import { Structure, SummaryResponse } from '../result-section/result-section.model';

@Component({
  selector: 'app-structures-section',
  templateUrl: './structures-section.component.html',
  styleUrls: ['./structures-section.component.css']
})
export class StructuresSectionComponent implements OnInit {
  private _resultData: any;
  haveResults = false;
  protvistaData: Partial<pvFormat.Accession> = null;
  availableProviders: Set<string> = new Set();

  @Input()
  get resultData(): any {
    return this._resultData;
  }
  set resultData(data: any) {
    this._resultData = data;
    if (data) {
      this.haveResults = true;
      this.protvistaData = this.convertToProtvistaFormat(this.resultData);
    } else {
      this.haveResults = false;
    }
  }

  constructor(private configService: ConfigurationService) { }

  ngOnInit(): void {}

  convertToProtvistaFormat(resultData: SummaryResponse): Partial<pvFormat.Accession> {
    let protvistaData: Partial<pvFormat.Accession> = {
      largeLabels: true,
      tracks: [{
        labelType: 'text',
        label: 'Structures (' +resultData.structures.length +')',
        data: [],
        overlapping: 'true'
      }],
      legends: {
        alignment: 'right',
        data: {}
      }
    };

    protvistaData.length = resultData.uniprot_entry.sequence_length;

    // prepare tracks
    resultData.structures.map(structure => {
      let trackDataItem: pvFormat.Data = {
        accession: structure.model_identifier,
        labelType: 'text',
        label: '<strong><a target="_blank" href="' + structure.model_url + '">' + structure.model_identifier + '</a></strong>',
        color: this.configService.getProviderColor(structure.provider),
        type: 'Structure',
        tooltipContent: 'Structure',
        labelTooltip: structure.model_identifier + ' (' + structure.provider + ')',
        locations: [{
          fragments: [{
            start: structure.uniprot_start,
            end: structure.uniprot_end,
            tooltipContent: this.prepareTooltip(structure)
          }
          ]
        }]
      }
      protvistaData.tracks[0].data.push(trackDataItem);
      this.availableProviders.add(structure.provider);
    });

    // prepare legends
    protvistaData.legends = this.prepareLegends(this.availableProviders);
    return protvistaData;
  }

  prepareTooltip(item: Structure): string {
    let tooltip = '';
    tooltip += 'UniProt range: ' + item.uniprot_start + '-' + item.uniprot_end;
    tooltip += '<br>Provider: ' + item.provider;
    tooltip += '<br>Category: ' + item.model_category;
    tooltip += item.resolution ? '<br>Resolution: ' + item.resolution : '';

    return tooltip;
  }

  prepareLegends(providers: Set<string>): pvFormat.Legends {
    let legendItems: pvFormat.LegendItem[] = [];
    for (let provider of providers) {
      let legend: pvFormat.LegendItem = {
        color: this.configService.getProviderColor(provider),
        text: provider
      }
      legendItems.push(legend);
    }
    return {
      alignment: 'right',
      data: {
        Providers: legendItems
      }
    }
  }
}
