import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SearchHeaderComponent } from 'src/app/search-header/search-header.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHeaderComponent {
  menuOpen: boolean;
  homePage: boolean;
  routeSubscribe: Subscription;
  constructor(private router: Router) {
    this.menuOpen = true;
    this.homePage = false;

    this.routeSubscribe = this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(e => {
      this.homePage = false;
      if(e.url && e.url === '/') this.homePage = true;
    });

  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  
}
