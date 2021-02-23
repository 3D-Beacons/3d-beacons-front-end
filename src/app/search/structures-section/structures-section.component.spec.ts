import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationService } from 'src/app/core/configuration.service';
import * as summaryFormat from '../result-section/result-section.model';
import * as pvFormat from '../result-section/protvista.model';
import { StructuresSectionComponent } from './structures-section.component';
import { EXPECTED_STRUCTURE_PROTVISTA } from 'mock-data/mock-expected-structures-protvista';
import { MOCK_SUMMARY_RESPONSE_PROTVISTA } from 'mock-data/mock-summary-response-protvista';

describe('StructuresSectionComponent', () => {
  let component: StructuresSectionComponent;
  let fixture: ComponentFixture<StructuresSectionComponent>;
  let configService: ConfigurationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StructuresSectionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuresSectionComponent);
    component = fixture.componentInstance;
    configService = TestBed.inject(ConfigurationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set haveResults properly when there is a result data', () => {
    component.resultData = MOCK_SUMMARY_RESPONSE_PROTVISTA;
    expect(component.haveResults).toBeTruthy();
    component.resultData = null;
    expect(component.haveResults).not.toBeTruthy();
  });

  it('should prepare a proper tooltip for a Structure item', () => {
    // with resolution present
    const structure1: summaryFormat.Structure = {
      model_identifier: '2rh1',
      model_category: 'EXPERIMENTALLY DETERMINED',
      provider: 'PDBE',
      created: '2007-10-05',
      sequence_identity: 69,
      uniprot_start: 1,
      uniprot_end: 365,
      resolution: 2.4,
      coverage: 80.39,
      model_url: 'https://www.ebi.ac.uk/pdbe/coordinates/2rh1/full?encoding=bcif&lowPrecisionCoords=1'
    };
    const expectedTooltip1 = 'UniProt range: 1-365<br>Provider: PDBE<br>Category: EXPERIMENTALLY DETERMINED<br>Resolution: 2.4';

    expect(component.prepareTooltip(structure1)).toEqual(expectedTooltip1);

    // with no resolution
    const structure2: summaryFormat.Structure = {
      model_identifier: '2rh1',
      model_category: 'EXPERIMENTALLY DETERMINED',
      provider: 'PDBE',
      created: '2007-10-05',
      sequence_identity: 69,
      uniprot_start: 1,
      uniprot_end: 365,
      coverage: 80.39,
      model_url: 'https://www.ebi.ac.uk/pdbe/coordinates/2rh1/full?encoding=bcif&lowPrecisionCoords=1'
    };
    const expectedTooltip2 = 'UniProt range: 1-365<br>Provider: PDBE<br>Category: EXPERIMENTALLY DETERMINED';

    expect(component.prepareTooltip(structure2)).toEqual(expectedTooltip2);
  });

  it('should return proper legends data for a set of providers', () => {
    const providers = ['PDBE', 'SWISSMODEL', 'PED'];
    const expectedLegends: pvFormat.Legends = {
      alignment: 'right',
      data: {
        Providers: [
          {
            color: configService.getProviderColor('PDBE'),
            text: 'PDBE'
          },
          {
            color: configService.getProviderColor('SWISSMODEL'),
            text: 'SWISSMODEL'
          },
          {
            color: configService.getProviderColor('PED'),
            text: 'PED'
          }
        ]
      }
    };
    expect(component.prepareLegends(new Set(providers))).toEqual(expectedLegends);
  });

  it('should return proper protvista format for a summary response', () => {
    const convertedProtvistaData = component.convertToProtvistaFormat(MOCK_SUMMARY_RESPONSE_PROTVISTA);

    // check length
    expect(convertedProtvistaData.length).toEqual(EXPECTED_STRUCTURE_PROTVISTA.length);
    
    // check tracks
    expect(convertedProtvistaData.tracks[0].data[0]).toEqual(EXPECTED_STRUCTURE_PROTVISTA.tracks[0].data[0]);
    expect(convertedProtvistaData.tracks[0].data[1]).toEqual(EXPECTED_STRUCTURE_PROTVISTA.tracks[0].data[1]);

    // check legends
    expect(convertedProtvistaData.legends.data.Providers).toEqual(jasmine.arrayContaining(EXPECTED_STRUCTURE_PROTVISTA.legends.data.Providers));

    // check Structures count
    expect(convertedProtvistaData.tracks[0].label).toEqual(EXPECTED_STRUCTURE_PROTVISTA.tracks[0].label);
  });

});
