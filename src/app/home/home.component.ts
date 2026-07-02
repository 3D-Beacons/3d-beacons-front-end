import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { ProvidersComponent } from "../providers/providers.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  imports: [CommonModule, ProvidersComponent],
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class HomeComponent {}
