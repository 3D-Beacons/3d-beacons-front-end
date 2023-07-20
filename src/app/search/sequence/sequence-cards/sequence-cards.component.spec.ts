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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceCardsComponent);
    component = fixture.componentInstance;
    component.res = {
        accession:"sdsdfs",
        title:"sdfds",
        subtitle:"dsfd",
        description:"sdf",
        source_organism:"sdfd",
        available_structure: "sdfd",
        query_sequence: "sdf",
        match_sequence: "sdfsdfd",
        match_accession: "sdfdsf",
        match_stats: [{lable:"sdfsd", value:"sdfsdfs"}],
        sequence_stats: [{lable:"sdfsd", value:"sdfsdfs"}]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
