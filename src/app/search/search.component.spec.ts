import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { INVALID_UNIPROT, VALID_UNIPROT } from 'mock-data/mock-input';
import { MOCK_UNIPROT_RESPONSE } from 'mock-data/mock-uniprot-data-response';
import { SummaryResponse } from './result-section/result-section.model';
import { UniProtEntry } from './result-section/uniprot-data.model';
import { SearchComponent } from './search.component';
import { SearchService } from './search.service';
import { MOCK_SUMMARY_RESPONSE } from 'mock-data/mock-summary-response';
import { ConfigurationService } from '../core/configuration.service';
import {ActivatedRoute} from '@angular/router';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchInput: DebugElement;
  let searchButton: DebugElement;
  let searchService: SearchService;
  let exampleAccessionLink: DebugElement;
  let accessionLinkId: string;
  let entryData: UniProtEntry;
  let summaryData: SummaryResponse;
  let configService: ConfigurationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [
        SearchService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({id: 'P38398'})
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    searchService = TestBed.inject(SearchService);
    configService = TestBed.inject(ConfigurationService);
    component = fixture.componentInstance;
    searchInput = fixture.debugElement.query(By.css('input[type="search"]'));
    searchButton = fixture.debugElement.query(By.css('button'));
    component.exampleAccessions = configService.getExampleAccessions();
    accessionLinkId = 'example-' + component.exampleAccessions[0];
    fixture.detectChanges()
    exampleAccessionLink = fixture.debugElement.query(By.css('a[id=' + accessionLinkId + ']'));
    entryData = MOCK_UNIPROT_RESPONSE;
    summaryData = MOCK_SUMMARY_RESPONSE;
  });

  /**
   * Shared function to run tests in case of valid responses from API
   */
  // function runValidTests(entryData?: UniProtEntry, summaryData?: SummaryResponse): void {
  //
  //   // check if isFetching is true
  //   expect(component.isFetching).toBeTruthy();
  //
  //   // check if error is null
  //   expect(component.error).toBeNull();
  //
  //   // check if resultData is null
  //   expect(component.resultData).toBeNull();
  //
  //   // check if getUniProtEntry function is invoked
  //   expect(searchService.getUniProtEntry).toHaveBeenCalledTimes(1);
  //
  //   // simulate the asynchronous event
  //   tick(1);
  //
  //   // check if getUniProtSummary function is invoked
  //   expect(searchService.getUniProtSummary).toHaveBeenCalledTimes(1);
  //
  //   // simulate the asynchronous event
  //   tick(1);
  //
  //   // check if isFetching is false
  //   expect(component.isFetching).toBeFalsy();
  //
  //   // check if error is null
  //   expect(component.error).toBeNull();
  //
  //   // check if resultData is not null
  //   expect(component.resultData).not.toBeNull();
  //
  //   if (entryData != undefined && summaryData != undefined) {
  //     // check if sequence, sequence_length and id is set properly from uniprot entry data
  //     expect(component.resultData.uniprot_entry.id).toBe(entryData.id);
  //     expect(component.resultData.uniprot_entry.sequence).toBe(entryData.sequence.sequence);
  //     expect(component.resultData.uniprot_entry.sequence_length).toBe(entryData.sequence.length);
  //   }
  // }

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //
  // it('should bind search term form control from input field', () => {
  //   searchInput.nativeElement.value = VALID_UNIPROT;
  //   searchInput.nativeElement.dispatchEvent(new Event('input'));
  //   expect(component.searchForm.controls.searchTerm.value).toBe(VALID_UNIPROT);
  // });
  //
  // it('should invoke onSearch function on click of search button', fakeAsync(() => {
  //   spyOn(component, 'onSearch');
  //   searchInput.nativeElement.value = VALID_UNIPROT;
  //   searchInput.nativeElement.dispatchEvent(new Event('input'));
  //   searchButton.triggerEventHandler('click', null);
  //   tick();
  //
  //   expect(component.onSearch).toHaveBeenCalledTimes(1);
  // }));
  //
  // it(
  //   'should invoke uniprot entry and summary calls on click of search button',
  //   fakeAsync(() => {
  //     spyOn(searchService, 'getUniProtEntry').and.returnValue(of(entryData).pipe(delay(1)));
  //     spyOn(searchService, 'getUniProtSummary').and.returnValue(of(summaryData).pipe(delay(1)));
  //
  //     searchInput.nativeElement.value = VALID_UNIPROT;
  //     searchInput.nativeElement.dispatchEvent(new Event('input'));
  //     searchButton.triggerEventHandler('click', null);
  //
  //     runValidTests(
  //       entryData = entryData,
  //       summaryData = summaryData);
  //   }));
  //
  // it(
  //   'should invoke uniprot entry and summary calls on click of an example accession',
  //   fakeAsync(() => {
  //     spyOn(searchService, 'getUniProtEntry').and.returnValue(of(entryData).pipe(delay(1)));
  //     spyOn(searchService, 'getUniProtSummary').and.returnValue(of(summaryData).pipe(delay(1)));
  //
  //     exampleAccessionLink.triggerEventHandler('click', null);
  //
  //     runValidTests(
  //       entryData = entryData,
  //       summaryData = summaryData);
  //   }));
  //
  // it(
  //   'should handle error in case for an invalid uniprot accession for uniprot entry API',
  //   fakeAsync(() => {
  //     spyOn(searchService, 'getUniProtEntry').and.returnValue(throwError('error').pipe(delay(1)));
  //
  //     searchInput.nativeElement.value = INVALID_UNIPROT;
  //     searchInput.nativeElement.dispatchEvent(new Event('input'));
  //     searchButton.triggerEventHandler('click', null);
  //
  //     // check if getUniProtEntry function is invoked
  //     expect(searchService.getUniProtEntry).toHaveBeenCalledTimes(1);
  //
  //     // simulate the asynchronous event
  //     tick(1);
  //
  //     // check if error is set as 'No data found!'
  //     expect(component.error).toBe('No data found!');
  //   }));
  //
  // it(
  //   'should handle error in case for an invalid uniprot accession for uniprot summary hub API',
  //   fakeAsync(() => {
  //     spyOn(searchService, 'getUniProtEntry').and.returnValue(of(entryData).pipe(delay(1)));
  //     spyOn(searchService, 'getUniProtSummary').and.returnValue(throwError('error').pipe(delay(1)));
  //
  //     searchInput.nativeElement.value = INVALID_UNIPROT;
  //     searchInput.nativeElement.dispatchEvent(new Event('input'));
  //     searchButton.triggerEventHandler('click', null);
  //
  //     // check if getUniProtEntry function is invoked
  //     expect(searchService.getUniProtEntry).toHaveBeenCalledTimes(1);
  //
  //     // simulate the asynchronous event
  //     tick(1);
  //
  //     // check if getUniProtSummary function is invoked
  //     expect(searchService.getUniProtSummary).toHaveBeenCalledTimes(1);
  //
  //     // simulate the asynchronous event
  //     tick(1);
  //
  //     // check if error is set as 'No data found!'
  //     expect(component.error).toBe('No data found!');
  //   }));
});
