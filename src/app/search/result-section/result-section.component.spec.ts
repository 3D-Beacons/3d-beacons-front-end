import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MOCK_SUMMARY_RESPONSE } from 'mock-data/mock-summary-response';
import { MOCK_SUMMARY_CATEGORIES } from 'mock-data/mock-summary-categories';
import { ResultSectionComponent } from './result-section.component';

describe('ResultSectionComponent', () => {
  let component: ResultSectionComponent;
  let fixture: ComponentFixture<ResultSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultSectionComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a valid category list with count for a response data', () => {
    component.resultData = MOCK_SUMMARY_RESPONSE;
    expect(component.prepareSummaryData()).toEqual(MOCK_SUMMARY_CATEGORIES);
  });

  it('should set haveResults properly', () => {
    // check if haveResults is set as true when there are results
    component.resultData = MOCK_SUMMARY_RESPONSE;
    expect(component.haveResults).toBeTruthy();

    // check if haveResults is set as true when there are results
    component.resultData = null;
    expect(component.haveResults).toBeFalsy();
  });
});
