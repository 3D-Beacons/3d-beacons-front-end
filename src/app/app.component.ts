import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { NavigationEnd, Router, RouterModule } from "@angular/router";
import { filter } from "rxjs/operators";
import { environment } from "../environments/environment";
import { AppHeaderComponent } from "./app-header/app-header.component";
import { VfEbiFooterComponent } from "./vf-ebi-footer/vf-ebi-footer.component";

declare const gtag: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  imports: [RouterModule, AppHeaderComponent, VfEbiFooterComponent],
  styleUrls: ["./app.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class AppComponent {
  private readonly router = inject(Router);

  constructor() {
    const navEndEvent$ = this.router.events.pipe(
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
