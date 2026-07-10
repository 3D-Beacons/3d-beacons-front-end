import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { ContentNavigator } from "../content-navigator/content-navigator";

@Component({
  selector: "app-docs",
  templateUrl: "./docs.component.html",
  imports: [CommonModule, ContentNavigator],
  styleUrls: ["./docs.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class DocsComponent {
  protected readonly contentNavigatorLinks = [
    { id: "programmatic", title: "Accessing data programmatically" },
    { id: "infra", title: "Infrastructure" },
    { id: "contact", title: "Contact us" },
  ];
}
