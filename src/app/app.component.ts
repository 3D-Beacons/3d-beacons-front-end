import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { environment } from "../environments/environment";

declare const gtag: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: false,
})
export class AppComponent {
  searchTerm = new FormControl("");

  constructor(private router: Router) {
    const navEndEvent$ = router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
    );
    navEndEvent$.subscribe((e: NavigationEnd) => {
      gtag("config", environment.gaTag, { page_path: e.urlAfterRedirects });
    });
    const headerScript = document.createElement("script");
    headerScript.async = true;
    headerScript.src =
      "https://www.googletagmanager.com/gtag/js?id=" + environment.gaTag;
    document.head.appendChild(headerScript);
  }
}
