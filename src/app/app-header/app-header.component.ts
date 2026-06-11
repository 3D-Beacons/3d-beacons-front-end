import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./app-header.component.html",
  styleUrls: ["./app-header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AppHeaderComponent {
  menuOpen: boolean;
  homePage: boolean;
  routeSubscribe: Subscription;
  constructor(private router: Router) {
    this.menuOpen = false;
    this.homePage = false;

    this.routeSubscribe = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.homePage = false;
        if (e.url && e.url === "/") this.homePage = true;
      });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
