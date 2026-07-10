import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { ContentNavigator } from "../content-navigator/content-navigator";

@Component({
  selector: "app-guidelines",
  templateUrl: "./guidelines.component.html",
  imports: [CommonModule, ContentNavigator],
  styleUrls: ["./guidelines.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class GuidelinesComponent {
  protected readonly contentNavigatorLinks = [
    { id: "data-providers", title: "Data providers" },
    { id: "terms-of-collaboration", title: "Terms of collaboration" },
    {
      id: "gdpr-notice",
      title: "General Data Protection Regulation (GDPR) notice",
    },
    { id: "technical-details", title: "Technical details" },
  ];
}
