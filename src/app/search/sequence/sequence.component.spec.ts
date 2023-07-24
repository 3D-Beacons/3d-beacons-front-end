import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceComponent } from './sequence.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SearchService } from '../search.service';
import { DataService } from 'src/app/core/data.service';

describe('SequenceComponent', () => {
  let component: SequenceComponent;
  let fixture: ComponentFixture<SequenceComponent>;
  let service: SearchService;
  let dataService: DataService;
  let route: ActivatedRoute;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SequenceComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          params: of({id: 'someJobId'})
        }
      }]
    
    })
    .compileComponents();
    service = TestBed.inject(SearchService);
    dataService = TestBed.inject(DataService);
    route = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceComponent);
    component = fixture.componentInstance;
    component.paginationData = {
      perPage: 1, currentPage: 1, totalPages: 0, pages: [], totalRecords: 2
    }
    component.cardData = [
      {
        "accession": "A0A809FN50",
        "title": "NAD(P)H-dependent oxidoreductase",
        "subtitle": "A0A809FN50 (A0A809FN55_BACIU)",
        "description": "NAD(P)H-dependent oxidoreductase OS=Bacillus subtilis subsp. subtilis OX=135461 GN=D9C10_03195 PE=4 SV=1",
        "source_organism": "Bacillus subtilis subsp. subtilis",
        "available_structure": "2 structures from AlphaFold DB, AlphaFill",
        "query_sequence": "MNMLVINGTPRKHGRTRIAASYIAALYHT",
        "match_sequence": "MNMLVINGTPRKHGRTRIAASYIAALYHT",
        "match_accession": "MNMLVINGTPRKHGRTRIAASYIAALYHT",
        "match_stats":[
          {label: 'Identity', value: '100%'},
          {label: 'HSP score', value: 150},
          {label: 'E-value', value: 6.9e-11},
          {label: 'Positives', value: '29/29 (100%)'},
          {label: 'Gaps', value: '0/29 (0%)'}
        ],
        "sequence_stats":[
          {label: 'Query length', value: 29},
          {label: 'Align length', value: 29},
          {label: 'Target length', value: 29}
        ]
      },
      {
        "accession": "A0A809FN56",
        "title": "NAD(P)H-dependent oxidoreductase 2",
        "subtitle": "A0A809FN56 (A0A809FN55_BACIU)",
        "description": "NAD(P)H-dependent oxidoreductase OS=Bacillus subtilis subsp. subtilis OX=135461 GN=D9C10_03195 PE=4 SV=1",
        "source_organism": "Bacillus subtilis subsp. subtilis",
        "available_structure": "2 structures from AlphaFold DB, AlphaFill",
        "query_sequence": "MNMLVINGTPRKHGRTRIAASYIAALYHT",
        "match_sequence": "MNMLVINGTPRKHGRTRIAASYIAALYHT",
        "match_accession": "MNMLVINGTPRKHGRTRIAASYIAALYHT",
        "match_stats":[
          {label: 'Identity', value: '100%'},
          {label: 'HSP score', value: 150},
          {label: 'E-value', value: 6.9e-11},
          {label: 'Positives', value: '29/29 (100%)'},
          {label: 'Gaps', value: '0/29 (0%)'}
        ],
        "sequence_stats":[
          {label: 'Query length', value: 29},
          {label: 'Align length', value: 29},
          {label: 'Target length', value: 29}
        ]
      },
      {
        "accession": "A0A809FN57",
        "title": "NAD(P)H-dependent oxidoreductase 3",
        "subtitle": "A0A809FN57 (A0A809FN55_BACIU)",
        "description": "NAD(P)H-dependent oxidoreductase OS=Bacillus subtilis subsp. subtilis OX=135461 GN=D9C10_03195 PE=4 SV=1",
        "source_organism": "Bacillus subtilis subsp. subtilis",
        "available_structure": "2 structures from AlphaFold DB, AlphaFill",
        "query_sequence": "MNMLVINGTPRKHGRTRIAASYIAALYHT",
        "match_sequence": "MNMLVINGTPRKHGRTRIAASYIAALYHT",
        "match_accession": "MNMLVINGTPRKHGRTRIAASYIAALYHT",
        "match_stats":[
          {label: 'Identity', value: '100%'},
          {label: 'HSP score', value: 150},
          {label: 'E-value', value: 6.9e-11},
          {label: 'Positives', value: '29/29 (100%)'},
          {label: 'Gaps', value: '0/29 (0%)'}
        ],
        "sequence_stats":[
          {label: 'Query length', value: 29},
          {label: 'Align length', value: 29},
          {label: 'Target length', value: 29}
        ]
      }
    ]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the searchTermValue to the searchService.searchTermValue', () => {
    const searchTermValue = 'test';
    service.searchTermValue = searchTermValue;
    fixture.detectChanges();
    expect(service.searchTermValue).toBe(searchTermValue);
  });

  it('should set the paginationData.pages to the visiblePageNumbers', () => {
    const paginationData = {
      pages: [1, 2, 3, 4, 5],
    };
    component.paginationData = paginationData;
    fixture.detectChanges();
    expect(component.paginationData.pages).toBe(paginationData.pages);
  });


  // it('should subscribe to the route.params and set the showErrorNoJobid if the id is empty', () => {
  //   const id = '';
  //   route.params.subscribe(params => {
  //     if (params.id === '') {
  //       component.showErrorNoJobid = true;
  //     }
  //   });
  //   fixture.detectChanges();
  //   expect(component.showErrorNoJobid).toBe(false);
  // });

  // it('should subscribe to the route.params and set the showErrorNoJobid if the id is empty', () => {
  //   const id = 'sdfsdfsdf';
  //   route.params.subscribe(params => {
  //     if (params.id === '') {
  //       component.showErrorNoJobid = true;
  //     }
  //   });
  //   fixture.detectChanges();
  //   expect(component.showErrorNoJobid).toBe(true);
  // });


    it('should copy the item to the clipboard', () => {
      const item = 'This is the item to be copied to the clipboard.';
      const spy = spyOn(document, 'execCommand').and.callThrough();
      component.copyToClipboard(item);
      expect(spy).toHaveBeenCalledWith('copy');
     // expect(document.clipboardData.getData('text/plain')).toBe(item);
    });

    it('should copy the current URL to the clipboard', () => {
      const link = window.location.href;
      const spy = spyOn(document, 'execCommand').and.callThrough();
      component.copyLink();
      expect(spy).toHaveBeenCalledWith('copy');
    });
   
    it('should return slice from the entire data', () => {
      const currentPage = 1;
      const cardDataChunk = component.getSlice(currentPage);
      const expectedChunks = [component.cardData[0]];
      expect(expectedChunks).toEqual(cardDataChunk);
    });
  
});
