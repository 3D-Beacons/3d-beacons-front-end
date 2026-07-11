import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  signal,
} from "@angular/core";
import { NavigationEnd, Router, RouterModule } from "@angular/router";
import { filter } from "rxjs/operators";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { CommonModule } from "@angular/common";
import { SearchHeaderComponent } from "../search-header/search-header.component";
import { heroAnimation } from "./gsap";

@Component({
  selector: "app-header",
  templateUrl: "./app-header.component.html",
  imports: [CommonModule, SearchHeaderComponent, RouterModule],
  styleUrls: ["./app-header.component.scss"],
})
export class AppHeaderComponent {
  protected readonly menuOpen = signal(false);
  protected readonly homePage = signal(false);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((e) => {
        this.homePage.set(false);
        if (e.url && e.url === "/") {
          this.homePage.set(true);
        }
      });

    afterNextRender(() => {
      heroAnimation();
    });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((value) => !value);
  }
}
