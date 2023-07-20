import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SearchService } from '../search/search.service';
import { SequenceService } from '../search/sequence/sequence.service';
import { SearchHeaderComponent } from './search-header.component';

describe('SearchHeaderComponent', () => {
  let component: SearchHeaderComponent;
  let fixture: ComponentFixture<SearchHeaderComponent>;
  let searchService: SearchService;
  let sequenceService: SequenceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchHeaderComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        SearchService,
        SequenceService,
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
    fixture = TestBed.createComponent(SearchHeaderComponent);
    searchService = TestBed.inject(SearchService);
    sequenceService = TestBed.inject(SequenceService);
    component = fixture.componentInstance;
    fixture.detectChanges()
  });

  it('should create', () => {
    //expect(component).toBeTruthy();
    expect(component).not.toEqual(null);
  });
});
