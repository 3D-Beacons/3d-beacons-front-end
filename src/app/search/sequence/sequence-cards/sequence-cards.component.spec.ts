import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceCardsComponent } from './sequence-cards.component';

describe('SequenceCardsComponent', () => {
  let component: SequenceCardsComponent;
  let fixture: ComponentFixture<SequenceCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SequenceCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SequenceCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
