import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MOCK_SUMMARY_RESPONSE } from 'mock-data/mock-summary-response';
import { MOCK_SUMMARY_CATEGORIES } from 'mock-data/mock-summary-categories';
import { MOCK_UNIPROT_RESPONSE } from 'mock-data/mock-uniprot-data-response';
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

  it('getSum should work fine', () => {
    component.resultData = MOCK_SUMMARY_RESPONSE;
    expect(component.getSum()).toEqual(2);
  });

  it('switchText should switch indeed', () => {
    const mockInfoText = {
      label: 'Protein', text: 'Beta-2 adrenergic receptor', italic: false, show_long: true, source: '', source_url: ''
    };
    component.switchText(mockInfoText);
    expect(mockInfoText.show_long).toEqual(false);
    component.switchText(mockInfoText);
    expect(mockInfoText.show_long).toEqual(true);
  });

  it('checkIfHasToShowMore should work', () => {
    component.textLimit = 2;
    const mockInfoText = {
      label: 'Protein', text: 'Beta-2 adrenergic receptor', italic: false, show_long: true, source: '', source_url: ''
    };
    expect(component.checkIfHasToShowMore(mockInfoText)).toEqual(false);
    component.textLimit = 3;
    expect(component.checkIfHasToShowMore(mockInfoText)).toEqual(false);
    mockInfoText.show_long = false;
    expect(component.checkIfHasToShowMore(mockInfoText)).toEqual(true);
  });

  it('getShortenedText should cut the length of texts', () => {
    component.textLimit = 2;
    expect(component.getShortenedText('foo foo foo foo foo')).toEqual('foo foo ...');
    expect(component.getShortenedText('foo foo')).toEqual('foo foo');
    expect(component.getShortenedText('')).toBeFalsy();
  });

  it('should create the infoText array', () => {
    const infoText = component.prepareInfoText(MOCK_UNIPROT_RESPONSE);
    const expectedInfoText = [
      { label: 'Protein', text: 'Beta-2 adrenergic receptor', italic: false, show_long: true, source: '', source_url: '' },
      { label: 'Gene', text: 'ADRB2', italic: false, show_long: true, source: '', source_url: '' },
      { label: 'Source organism', text: 'Homo sapiens', italic: true, show_long: true, source: '', source_url: '' },
      { label: 'Biological function', text: 'Beta-adrenergic receptors mediate the catecholamine-induced activation of adenylate cyclase through the action of G proteins. The beta-2-adrenergic receptor binds epinephrine with an approximately 30-fold greater affinity than it does norepinephrine.', italic: false, show_long: false, source: 'UniProt', source_url: 'https://www.uniprot.org/uniprot/P07550' }
    ];
    expect(infoText).toEqual(expectedInfoText);
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
