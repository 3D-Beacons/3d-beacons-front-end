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

  it('should create if the string is greater than 60 length', () => {
    fixture = TestBed.createComponent(SequenceCardsComponent);
    component = fixture.componentInstance;
    component.res = {
        accession:"sdsdfs",
        title:"sdfds",
        subtitle:"dsfd",
        description:"sdf",
        source_organism:"sdfd",
        available_structure: "sdfd",
        query_sequence: "sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf",
        match_sequence: "sdfsdf",
        match_accession: "sdfdsf",
        match_stats: [{lable:"sdfsd", value:"sdfsdfs"}],
        sequence_stats: [{lable:"sdfsd", value:"sdfsdfs"}]
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.isShowingAll).toBeTrue();
  });

  
  it('should return chunks of string if string is greater than 60 in length', () => {
    const expectedChunks= [
      {start: 1, query_chunk: 'sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf', counttoshow: 60}, 
      {start: 61, query_chunk: 'sdfsdfsdfsdfsdfsdf', counttoshow: 78}
  ]
    const chunks = component.getStringsChunks("sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf")
    expect(expectedChunks).toEqual(chunks);
  });

  it('should return chunks of string if string is less than 60 in length', () => {
    const chunks = component.getStringsChunks("sdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdfsdf");
    expect(component.isShowingAll).toBeTrue;
    expect(component.islinkShow).toBeTrue;
  });

  it('should return value of lable from the stats', () => {
    const matchStats = [
      {label: 'Identity', value: '97%'},
      {label: 'HSP score', value: 147},
      {label: 'E-value', value: 1.9e-10},
      {label: 'Positives', value: '29/29 (100%)'},
      {label: 'Gaps', value: '0/29 (0%)'}
    ];
    const identityValue = component.getLabelValue("Identity",matchStats)
    expect(identityValue).toBe("97%");
  });
  

});
