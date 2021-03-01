import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { VALID_UNIPROT } from 'mock-data/mock-input';
import { SearchComponent } from './search.component';
import { SearchService } from './search.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchInput: DebugElement;
  let searchButton: DebugElement;
  let searchService: SearchService;
  let exampleAccessionLink: DebugElement;
  let accessionLinkId: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [SearchService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    searchService = TestBed.inject(SearchService);
    component = fixture.componentInstance;
    searchInput = fixture.debugElement.query(By.css('input[type="search"]'));
    searchButton = fixture.debugElement.query(By.css('button'));
    component.exampleAccessions = [VALID_UNIPROT];
    accessionLinkId = 'example-' +component.exampleAccessions[0];
    fixture.detectChanges();
    exampleAccessionLink = fixture.debugElement.query(By.css('a[id=' +accessionLinkId +']'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind search term form control from input field', () => {
    searchInput.nativeElement.value = VALID_UNIPROT;
    searchInput.nativeElement.dispatchEvent(new Event('input'));
    expect(component.searchForm.controls.searchTerm.value).toBe(VALID_UNIPROT);
  });

  it('should invoke onSearch function on click of search button', fakeAsync(() => {
    spyOn(component, 'onSearch');
    searchInput.nativeElement.value = VALID_UNIPROT;
    searchInput.nativeElement.dispatchEvent(new Event('input'));
    searchButton.triggerEventHandler('click', null);
    tick();

    expect(component.onSearch).toHaveBeenCalledTimes(1);
  }));

  it('should invoke uniprot summary call on click of search button', fakeAsync(() => {
    spyOn(searchService, 'getUniProtSummary');
    searchInput.nativeElement.value = VALID_UNIPROT;
    searchInput.nativeElement.dispatchEvent(new Event('input'));
    searchButton.triggerEventHandler('click', null);
    tick();

    // check if the function is invoked
    expect(searchService.getUniProtSummary).toHaveBeenCalledTimes(1);

    // check is isFetching is true
    expect(component.isFetching).toBeTruthy();

    // check is isFetching is null
    expect(component.error).toBeNull();
  }));

  it('should invoke uniprot summary call on click of an example accession', fakeAsync(() => {
    spyOn(searchService, 'getUniProtSummary');
    
    exampleAccessionLink.triggerEventHandler('click', null);

    // check if the function is invoked
    expect(searchService.getUniProtSummary).toHaveBeenCalledTimes(1);

    // check is isFetching is true
    expect(component.isFetching).toBeTruthy();

    // check is isFetching is null
    expect(component.error).toBeNull();
  }));

});
