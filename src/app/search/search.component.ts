import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  signal,
  inject,
  DestroyRef,
} from "@angular/core";
import { SummaryResponse } from "./result-section/result-section.model";
import { SearchService } from "./search.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UniProtEntry } from "./result-section/uniprot-data.model";
import { ResultSectionComponent } from "./result-section/result-section.component";
import { CommonModule } from "@angular/common";
import { StructuresSectionComponent } from "./structures-section/structures-section.component";
import { catchError, EMPTY, forkJoin, of, switchMap, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MaterialModule } from "../material.module";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { LoadingState } from "./loading-state.enum";

const routeTabs = [
  { label: "Information", id: "information" },
  { label: "Structures", id: "structures" },
];

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  imports: [
    CommonModule,
    ResultSectionComponent,
    StructuresSectionComponent,
    MaterialModule,
    NgxSkeletonLoaderModule,
  ],
  styleUrls: ["./search.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class SearchComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly searchService = inject(SearchService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly accession = signal("");
  protected readonly status = LoadingState;
  protected readonly loadingState = signal<LoadingState>(LoadingState.LOADING);

  protected readonly resultData = signal<SummaryResponse | null>(null);
  protected readonly entryData = signal<UniProtEntry | null>(null);
  protected readonly isFetching = signal(false);
  protected readonly sequence = signal<string | any>(null);
  protected readonly error = signal(false);

  public selectedTab = signal<number>(0);

  constructor() {
    this.route.queryParams.subscribe((params) => {
      const tabName = params["activeTab"];
      const tabIndex = routeTabs.findIndex((tab) => tab.id === tabName);
      this.selectedTab.set(tabIndex);
    });
  }

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: { [x: string]: string }) => {
          const accession = params["id"];
          this.loadingState.set(LoadingState.LOADING);
          this.accession.set(accession);
          return forkJoin([
            this.searchService.getUniProtEntry(accession),
            this.searchService.getUniProtSummary(accession),
          ]).pipe(
            catchError(() => {
              this.loadingState.set(LoadingState.FAILURE);
              return EMPTY;
            }),
          );
        }),
        tap(([entryData, summaryData]) => {
          this.entryData.set(entryData);
          const updatedSummaryData: SummaryResponse = {
            ...summaryData,
            uniprot_entry: {
              ...summaryData.uniprot_entry,
              sequence_length: entryData.sequence.length,
              sequence: entryData.sequence.sequence,
              id: entryData.id,
            },
          };
          this.resultData.set(updatedSummaryData);
          this.loadingState.set(LoadingState.SUCCESS);
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  protected selectTab(event: MatTabChangeEvent) {
    const tabName = routeTabs[event.index].id;

    this.router.navigate([], {
      queryParams: { activeTab: tabName },
      queryParamsHandling: "merge",
    });
  }
}
