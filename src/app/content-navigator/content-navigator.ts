import { Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";

export interface Link {
  id: string;
  title: string;
}

@Component({
  selector: "content-navigator",
  imports: [CommonModule],
  templateUrl: "./content-navigator.html",
  styleUrls: ["./content-navigator.scss"],
})
export class ContentNavigator {
  readonly navLinks = input.required<Link[]>();
  readonly offsetTop = input(40);

  protected scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.style.scrollMarginTop = `${this.offsetTop()}px`;
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
}
