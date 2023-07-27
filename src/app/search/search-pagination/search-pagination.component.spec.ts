import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPaginationComponent } from './search-pagination.component';

describe('SearchPaginationComponent', () => {
  let component: SearchPaginationComponent;
  const selectedPage = jasmine.createSpyObj('selectedPage', ['emit']);
  let fixture: ComponentFixture<SearchPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPaginationComponent);
    component = fixture.componentInstance;
    component.paginationData = {
        perPage: 20, currentPage: 1, totalPages: 5, pages: [], totalRecords: 100
    }

    component.selectedPage = selectedPage;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should emit a selectedPage event when the paginateTo() method is called', () => {
    const pageIndex = 2;
    const source = 'source';
    component.paginateTo(pageIndex, source);
    expect(selectedPage.emit).toHaveBeenCalledWith({
      pageIndex: pageIndex,
      source: source,
    });
  });
});
