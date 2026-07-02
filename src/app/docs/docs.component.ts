import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-docs",
  templateUrl: "./docs.component.html",
  imports: [CommonModule],
  styleUrls: ["./docs.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class DocsComponent {}
