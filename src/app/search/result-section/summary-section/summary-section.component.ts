import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, input } from "@angular/core";

@Component({
  selector: "app-summary-section",
  templateUrl: "./summary-section.component.html",
  imports: [CommonModule],
  styleUrls: ["./summary-section.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class SummarySectionComponent {
  protected readonly summaryData = input.required<any[]>();

  getIconStyle(count: number) {
    if (count > 0) {
      return { color: "#085F5C" };
    } else {
      return { color: "lightgrey" };
    }
  }
}
