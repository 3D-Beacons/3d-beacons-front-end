import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary-section',
  templateUrl: './summary-section.component.html',
  styleUrls: ['./summary-section.component.css']
})
export class SummarySectionComponent {

  @Input() summaryData: any;

  getIconStyle(count: number) {
    if (count > 0) {
      return {'color': '#085F5C'};
    } else {
      return {'color': 'lightgrey'};
    }
  }

}
