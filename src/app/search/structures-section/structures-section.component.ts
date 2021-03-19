import { Component, Input } from '@angular/core';

import { ConfigurationService } from 'src/app/core/configuration.service';
import * as pvFormat from '../result-section/protvista.model';
import { Structure, SummaryResponse } from '../result-section/result-section.model';

@Component({
  selector: 'app-structures-section',
  templateUrl: './structures-section.component.html',
  styleUrls: ['./structures-section.component.css']
})
export class StructuresSectionComponent {
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

  convertToProtvistaFormat(resultData: SummaryResponse): Partial<pvFormat.Accession> {
    let protvistaData: Partial<pvFormat.Accession> = {
      largeLabels: true,
      tracks: [],
      legends: {
        alignment: 'right',
        data: {}
      }
    };

    let firstStructure: boolean = true;
    protvistaData.length = resultData.uniprot_entry.sequence_length;
    protvistaData.sequence = resultData.uniprot_entry.sequence;

    // prepare tracks
    let tracks: { [key: string]: pvFormat.Track } = {};
    resultData.structures.map(structure => {
      if (tracks[structure.model_category] == undefined) {
        tracks[structure.model_category] = {
          labelType: 'text',
          label: structure.model_category,
          data: [],
          overlapping: 'true'
        }
      }

      // display Mol* for the very first structure in the list
      if (firstStructure) {
        this.handleMolstar(structure);
        firstStructure = !firstStructure;
      }

      let trackDataItem: pvFormat.Data = {
        accession: structure.model_identifier,
        labelType: 'text',
        label: this.prepareLabel(structure),
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
      tracks[structure.model_category].data.push(trackDataItem);
      this.availableProviders.add(structure.provider);
    });

    for (let track in tracks) {
      // set count for each category
      tracks[track]["label"] += ' (' + tracks[track]["data"].length + ')'
      protvistaData.tracks.push(tracks[track]);
    }

    // prepare legends
    protvistaData.legends = this.prepareLegends(this.availableProviders);
    return protvistaData;
  }

  prepareTooltip(item: Structure): string {
    let tooltip = '';
    tooltip += 'UniProt range: ' + item.uniprot_start + '-' + item.uniprot_end;
    tooltip += '<br>Provider: ' + item.provider;
    tooltip += '<br>Category: ' + item.model_category;
    tooltip += item.resolution ? '<br>Resolution: ' + item.resolution + 'Å' : '';
    tooltip += item.qmean_avg_local_score ? '<br>QMEAN: ' + item.qmean_avg_local_score : '';
    tooltip += '<br><a target="_blank" href="' + item.model_url + '">Click to Download <i class="icon icon-common icon-download"></i></a>';

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

  prepareLabel(structure: Structure) {
    return '<strong><a data-url="' + structure.model_url + '" data-format="' +
      (structure.model_format != undefined ? structure.model_format.toLowerCase() : "") +
      '" onclick="updateMolstar(this)">' + structure.model_identifier + '</a></strong>'
  }

  handleMolstar(structure: Structure) {
    let molstarPlugin = window["molstarPlugin"]
    let viewerContainer = document.getElementById('molstar-container');
    let options = {
      customData: {
        url: structure.model_url,
        format: structure.model_format != undefined ? structure.model_format.toLowerCase() : ""
      },
      hideControls: true,
      subscribeEvents: true
    }

    // only render molstar for first time, use visual.update function for updates
    if (!window["molstarRendered"]) {
      molstarPlugin.render(viewerContainer, options);
      window["molstarRendered"] = true;
    } else {
      molstarPlugin.visual.update(options);
    }
  }
}
