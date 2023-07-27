import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHeaderComponent } from './app-header.component';

import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';

class MockRouteServices {
  public events = of( new NavigationEnd(0, '/', '/'));
}
describe('AppHeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppHeaderComponent ],
      providers: [
        { provide: Router, useClass: MockRouteServices },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    router = fixture.debugElement.injector.get( Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set homePage to true', () => {
    expect(component.homePage).toEqual(true);
  });
  it('should toggle menu', () => {
    const previousState = component.menuOpen = true;
    component.toggleMenu();
    expect(component.menuOpen).toEqual(!previousState);
  });
});
