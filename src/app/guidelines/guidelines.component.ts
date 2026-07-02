import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-guidelines",
  templateUrl: "./guidelines.component.html",
  imports: [CommonModule],
  styleUrls: ["./guidelines.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class GuidelinesComponent {}
