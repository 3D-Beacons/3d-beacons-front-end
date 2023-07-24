import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from './app.component';
import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
class MockRouteServices {
  public events = of( new NavigationEnd(0, '/', '/'));
}
describe('AppComponent', () => {
  let app: AppComponent;
  let router: Router;
 
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule
      ], 
      providers: [
        { provide: Router, useClass: MockRouteServices },
      ]
    }).compileComponents();
    (<any>window).gtag=function() {}
    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    router = fixture.debugElement.injector.get( Router);
    fixture.detectChanges();
  }));
  it('should create', () => {
    expect(app).toBeTruthy();
  });

});
