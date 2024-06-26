import { Component, Input, ElementRef, Renderer2, OnDestroy } from '@angular/core';

import { ConfigurationService } from 'src/app/core/configuration.service';
import * as pvFormat from '../result-section/protvista.model';
import { Overview, Structure, SummaryResponse } from '../result-section/result-section.model';

@Component({
  selector: 'app-structures-section',
  templateUrl: './structures-section.component.html',
  styleUrls: ['./structures-section.component.css']
})
export class StructuresSectionComponent implements OnDestroy {
  private _resultData: any;
  haveResults = false;
  protvistaData: Partial<pvFormat.Accession> = null;
  availableProviders: Set<string> = new Set();
  displayedEntry: string;
  displayedEntryUrl: string;
  help: boolean;

  @Input()
  get resultData(): any {
    return this._resultData;
  }
  set resultData(data: any) {
    this._resultData = data;
    if (data) {
      this.haveResults = true;
      this.protvistaData = this.convertToProtvistaFormat(this.resultData);
      this.addProtvista()
    } else {
      this.haveResults = false;
    }
  }

  constructor(private elm: ElementRef, private renderer: Renderer2, private configService: ConfigurationService) {
    // document.addEventListener('protvista-click', (e: CustomEvent) => {
    //   var re = /(.*)\s\((.*)\)/;
    //   this.displayedEntry = e.detail.feature.labelTooltip.replace(re, "$1 from $2");
    // });
    document.addEventListener('eye-click', (e: CustomEvent) => {
      this.displayedEntry = e.detail.modelId +' from ' +e.detail.modelProvider;
      this.displayedEntryUrl = e.detail.modelUrl;
    });
    this.help = false;
  }

  toggleHelp() {
    this.help = !this.help;
  }

  ngOnDestroy(): void {
    window["molstarRendered"] = false;
  }

  convertToProtvistaFormat(resultData: SummaryResponse): Partial<pvFormat.Accession> {
    const protvistaData: Partial<pvFormat.Accession> = {
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
    const tracks: { [key: string]: pvFormat.Track } = {};
    resultData.structures.map(structure => {
      if (tracks[structure.summary.model_category] === undefined) {
        tracks[structure.summary.model_category] = {
          labelType: 'text',
          label: '<span style="color:#fff">'
            + structure.summary.model_category.charAt(0).toUpperCase()
            + structure.summary.model_category.slice(1).toLowerCase()
            + '</span>',
          labelColor: '#217976',
          data: [],
          overlapping: 'true'
        };
      }

      // display Mol* for the very first structure in the list
      if (firstStructure) {
        this.handleMolstar(structure);
        firstStructure = !firstStructure;
      }

      let trackDataItem: pvFormat.Data = {
        accession: structure.summary.model_identifier,
        labelType: 'text',
        label: this.prepareLabel(structure),
        color: this.configService.getProviderColor(structure.summary.provider),
        labelColor: '#C0DCDB',
        type: 'Structure',
        tooltipContent: 'Structure',
        labelTooltip: 'ID: ' + structure.summary.model_identifier + ' (' + structure.summary.provider + ')',
        locations: [{
          fragments: [{
            start: structure.summary.uniprot_start,
            end: structure.summary.uniprot_end,
            tooltipContent: this.prepareTooltip(structure)
          }
          ]
        }]
      };
      tracks[structure.summary.model_category].data.push(trackDataItem);
      this.availableProviders.add(structure.summary.provider);
    });

    for (let track in tracks) {
      // set count for each category
      tracks[track]['label'] += ' <span style="color:#fff">(' + tracks[track]['data'].length + ')</span>';
      protvistaData.tracks.push(tracks[track]);
    }

    // prepare legends
    protvistaData.legends = this.prepareLegends(this.availableProviders);
    return protvistaData;
  }

  prepareTooltip(item: Overview): string {
    let tooltip = '';
    tooltip += 'UniProt range: ' + item.summary.uniprot_start + '-' + item.summary.uniprot_end;
    tooltip += '<br>Provider: ' + item.summary.provider;
    tooltip += '<br>Category: ' + item.summary.model_category.charAt(0).toUpperCase() + item.summary.model_category.slice(1).toLowerCase();
    tooltip += item.summary.resolution ? '<br>Resolution: ' + item.summary.resolution + 'Å' : '';
    tooltip += item.summary.confidence_avg_local_score ? '<br>' + item.summary.confidence_type + ' confidence: ' + item.summary.confidence_avg_local_score : '';
    tooltip += '<br><a target="_blank" href="' + item.summary.model_url + '">Click to Download <i class="icon icon-common icon-download"></i></a>';

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

  prepareLabel(structure: Overview) {
    const model_links = structure.summary.model_page_url ? 
                        '<strong><a href="' + structure.summary.model_page_url + '" target="_blank">' + structure.summary.provider + '</a></strong>' : 
                        '<strong>' + structure.summary.provider + '</strong>';
                        
    return '' +
      model_links +
      '<span style="float: right; margin-right: 5px;">' +
      '<a data-url="' + (structure.summary.ensemble_sample_url ? structure.summary.ensemble_sample_url : structure.summary.model_url) + '" data-format="' +
      (structure.summary.ensemble_sample_format ? structure.summary.ensemble_sample_format.toLowerCase() : structure.summary.model_format.toLowerCase()) +'"' +
      ' data-model-identifier="' + structure.summary.model_identifier + '" data-model-provider="' + structure.summary.provider +
      '" onclick="updateMolstar(this)" style="border-bottom: none;">' +
      '<i class="icon icon-common icon-eye" style="margin-left: 10px; background-color: #dff1f0; padding: 5px; border: 1px solid black"></i></a>' +
      '<a target="_blank" href="' + structure.summary.model_url + '" style="border-bottom: none;" download>' +
      '<i class="icon icon-common icon-download" style="margin-left: 10px; background-color: #dff1f0; padding: 5px; border: 1px solid black"></i>' +
      '</a>' +
      '</span>';
  }

  handleMolstar(structure: Overview) {
    this.displayedEntry = structure.summary.model_identifier + ' from ' + structure.summary.provider;
    let molstarPlugin = window['molstarPlugin'];
    let viewerContainer = document.getElementById('molstar-container');
    const url = structure.summary.ensemble_sample_url ? structure.summary.ensemble_sample_url : structure.summary.model_url;
    const format = structure.summary.ensemble_sample_format ? structure.summary.ensemble_sample_format.toLowerCase() : structure.summary.model_format.toLowerCase();
    this.displayedEntryUrl = url;
    let options = {
      customData: {
        url: url,
        format: format
      },
      hideControls: true,
      subscribeEvents: true,
      selectInteraction: false,
      bgColor: {r: 255, g: 255, b: 255},
      hideCanvasControls: ['selection', 'animation'],
      hideStructure: ['water'],
      lighting: 'plastic',
      landscape: true,
    };

    // only render molstar for first time, use visual.update function for updates
    if (!window["molstarRendered"]) {
      molstarPlugin.render(viewerContainer, options);
      window["molstarRendered"] = true;
    } else {
      molstarPlugin.visual.update(options);
    }
  }

  addProtvista() {
    const pvParentEle = this.elm.nativeElement.querySelectorAll('.appPvContainer')[0];

    if (pvParentEle) {

      const oldPvEle = this.elm.nativeElement.querySelectorAll('.protvista-pdb')[0];
      if (oldPvEle) {
        oldPvEle.remove();
      }
      const pvEle = this.renderer.createElement('protvista-pdb');
      this.renderer.setAttribute(pvEle, 'custom-data', 'true');
      this.renderer.appendChild(pvParentEle, pvEle);
      this.renderer.setProperty(pvEle, 'viewerdata', this.protvistaData);
    }
  }

}
