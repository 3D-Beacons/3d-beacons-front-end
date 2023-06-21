import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceComponent } from './sequence.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('SequenceComponent', () => {
  let component: SequenceComponent;
  let fixture: ComponentFixture<SequenceComponent>;

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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
