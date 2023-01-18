import { TestBed } from '@angular/core/testing';

import { SequenceService } from './sequence.service';
import { DataService } from '../core/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SequenceService', () => {
  let service: SequenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SequenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
