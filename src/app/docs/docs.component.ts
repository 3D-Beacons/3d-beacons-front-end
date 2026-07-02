import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-docs",
  templateUrl: "./docs.component.html",
  styleUrls: ["./docs.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false,
})
export class DocsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
