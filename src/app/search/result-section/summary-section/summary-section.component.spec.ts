import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarySectionComponent } from './summary-section.component';

describe('SummarySectionComponent', () => {
  let component: SummarySectionComponent;
  let fixture: ComponentFixture<SummarySectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummarySectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarySectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getIconStyle() should work', () => {
    expect(component.getIconStyle(0)).toEqual({'color': 'lightgrey'});
    expect(component.getIconStyle(1)).toEqual({'color': '#085F5C'});
  });
});
