import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { VALID_UNIPROT } from 'mock-data/mock-input';
import { MOCK_SUMMARY_RESPONSE } from 'mock-data/mock-summary-response';
import { ConfigurationService } from './configuration.service';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpClientSpy: { get: jasmine.Spy };
  let httpTestingController: HttpTestingController;
  let configService: ConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(DataService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    httpTestingController = TestBed.inject(HttpTestingController);
    configService = TestBed.inject(ConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('getUniProtSummary should make http client get call for uniprot summary', () => {
    service.getUniProtSummary(VALID_UNIPROT).subscribe(data => {
      // check if data is equal
      expect(data).toEqual(MOCK_SUMMARY_RESPONSE);
    });

    // get the request and ensure it called proper URL
    const req = httpTestingController.expectOne(configService.getUniProtSummaryUrl() + VALID_UNIPROT + '.json');
  
    // check if it made a GET request
    expect(req.request.method).toEqual('GET');

    req.flush(MOCK_SUMMARY_RESPONSE);
  });
});
