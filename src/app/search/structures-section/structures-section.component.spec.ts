import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

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

  it('should set haveResults properly when there is a result data', fakeAsync(() => {
    spyOn(component, 'handleMolstar').and.returnValue();

    component.resultData = MOCK_SUMMARY_RESPONSE_PROTVISTA;
    expect(component.haveResults).toBeTruthy();
    component.resultData = null;
    expect(component.haveResults).not.toBeTruthy();
  }));

  it('should prepare a proper tooltip for a Structure item', () => {
    // with resolution present
    const structure1: summaryFormat.Overview = {
      summary: {
        model_identifier: '4lde',
        model_category: 'EXPERIMENTALLY DETERMINED',
        provider: 'PDBE',
        created: '2013-06-24',
        sequence_identity: 90,
        uniprot_start: 29,
        uniprot_end: 348,
        resolution: 2.79,
        coverage: 70.7,
        model_url: 'https://www.ebi.ac.uk/pdbe/static/entry/4lde_updated.cif',
        entities: [
          {
            entity_type: 'POLYMER',
            entity_poly_type: 'POLYPEPTIDE(L)',
            identifier: 'P38398',
            identifier_category: 'UNIPROT',
            description: 'Breast cancer type 1 susceptibility protein',
            chain_ids: ['B','A']
          }
        ]
      }
    };
    const expectedTooltip1 =
      'UniProt range: 29-348<br>Provider: PDBE<br>Category: Experimentally determined<br>Resolution: 2.79Å' +
      '<br><a target="_blank" href="https://www.ebi.ac.uk/pdbe/static/entry/4lde_updated.cif"' +
      '>Click to Download <i class="icon icon-common icon-download"></i></a>';

    expect(component.prepareTooltip(structure1)).toEqual(expectedTooltip1);

    // with no resolution
    const structure2: summaryFormat.Overview = {
      summary: {
        model_identifier: '4lde',
        model_category: 'EXPERIMENTALLY DETERMINED',
        provider: 'PDBE',
        created: '2013-06-24',
        sequence_identity: 90,
        uniprot_start: 29,
        uniprot_end: 348,
        coverage: 70.7,
        model_url: 'https://www.ebi.ac.uk/pdbe/static/entry/4lde_updated.cif',
        entities: [
          {
            entity_type: 'POLYMER',
            entity_poly_type: 'POLYPEPTIDE(L)',
            identifier: 'P38398',
            identifier_category: 'UNIPROT',
            description: 'Breast cancer type 1 susceptibility protein',
            chain_ids: ['B','A']
          }
        ]
      }
    };
    const expectedTooltip2 = 'UniProt range: 29-348<br>Provider: PDBE<br>Category: Experimentally determined' +
    '<br><a target="_blank" href="https://www.ebi.ac.uk/pdbe/static/entry/4lde_updated.cif"' +
    '>Click to Download <i class="icon icon-common icon-download"></i></a>';

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

  it('should return proper protvista format for a summary response', fakeAsync(() => {
    spyOn(component, 'handleMolstar').and.returnValue();

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
  }));

});
