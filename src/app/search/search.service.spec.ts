
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SearchService } from './search.service';
import { DataService } from '../core/data.service';
import { VALID_UNIPROT } from 'mock-data/mock-input';

describe('SearchService', () => {
  let service: SearchService;
  let dataService: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SearchService);
    dataService = TestBed.inject(DataService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUniProtSummary should invoke getUniProtSummary of DataService', () => {
    spyOn(dataService, 'getUniProtSummary');

    // call the method
    service.getUniProtSummary(VALID_UNIPROT);

    expect(dataService.getUniProtSummary).toHaveBeenCalledWith(VALID_UNIPROT);
  });

});
