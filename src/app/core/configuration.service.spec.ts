import { TestBed } from '@angular/core/testing';

import { ConfigurationService } from './configuration.service';

describe('ConfigurationService', () => {
  let service: ConfigurationService;
  const sampleApiHost = 'https://3dbeacons.org/api';
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a valid url for uniprot summary', () => {
    service['apiRoot'] = sampleApiHost;
    const expectedUrl = sampleApiHost +'/uniprot/summary/';
    expect(service.getUniProtSummaryUrl()).toBe(expectedUrl);
  });

  it('should return a valid url for uniprot details', () => {
    service['apiRoot'] = sampleApiHost;
    const expectedUrl = sampleApiHost +'/uniprot/';
    expect(service.getUniProtDetailsUrl()).toBe(expectedUrl);
  });

  it('should return proper color code for a provider', () => {
    const expectedCodes = ['#085f5c', '#7474bf', '#2274a5', 'rgb(255,99,163)'];
    const inProviders = ['PDBE', 'SWISSMODEL', 'PED', 'not a provider'];
    
    for (let i = 0; i < inProviders.length; i++) {
      expect(service.getProviderColor(inProviders[i])).toEqual(expectedCodes[i]);
    }
  });

});
