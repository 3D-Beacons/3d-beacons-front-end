import { TestBed } from '@angular/core/testing';

import { SequenceService } from './sequence.service';
import { DataService } from '../../core/data.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('SequenceService', () => {
  let service: SequenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(SequenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
