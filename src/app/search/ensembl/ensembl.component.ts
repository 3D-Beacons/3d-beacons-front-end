import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  DestroyRef,
  inject,
  signal,
  computed,
} from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { SearchService } from "../search.service";
import { EnsemblDataFormatterService } from "./ensembl-data-formatter.service";

import { MatPaginator } from "@angular/material/paginator";
import { CommonModule } from "@angular/common";
import { SearchPaginationComponent } from "../search-pagination/search-pagination.component";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { switchMap, forkJoin, catchError, EMPTY, tap, of } from "rxjs";
import { LoadingState } from "../loading-state.enum";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";

@Component({
  selector: "app-ensembl",
  templateUrl: "./ensembl.component.html",
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    RouterModule,
    SearchPaginationComponent,
  ],
  styleUrls: ["./ensembl.component.scss"],
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class EnsemblComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly searchService = inject(SearchService);
  private readonly ensemblDataFormatterService = inject(
    EnsemblDataFormatterService,
  );
  protected readonly accession = signal("");
  protected readonly status = LoadingState;
  protected readonly loadingState = signal<LoadingState>(LoadingState.LOADING);

  protected readonly cardData = signal<any | null>(null);
  protected readonly cardLength = computed(() => this.cardData()?.length || 0);

  protected paginationData: any = {
    perPage: 10,
    currentPage: 1,
    totalPages: 3,
    pages: [],
    totalRecords: 3,
  };

  protected cardDataChunk: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: { [x: string]: string }) => {
          const accession = params["id"];
          this.loadingState.set(LoadingState.LOADING);
          this.accession.set(accession);
          return forkJoin([
            this.searchService.submitEnsemblSearch(accession),
          ]).pipe(
            catchError(() => {
              this.loadingState.set(LoadingState.FAILURE);
              return EMPTY;
            }),
          );
        }),
        tap(([data]) => {
          this.cardData.set(this.ensemblDataFormatterService.formatData(data));
          this.cardDataChunk = this.getSlice(this.paginationData.currentPage);

          this.paginationData.totalPages = Math.ceil(
            this.cardLength() / this.paginationData.perPage,
          );
          this.paginationData.totalRecords = this.cardLength();
          this.paginationData.pages = this.visiblePageNumbers();
          this.paginationData = Object.assign({}, this.paginationData);
          this.loadingState.set(LoadingState.SUCCESS);
          return of(null);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  private getSlice(currentPage: any) {
    const start =
      currentPage * this.paginationData.perPage - this.paginationData.perPage;
    const end = currentPage * this.paginationData.perPage;
    return this.cardData()?.slice(start, end);
  }

  private visiblePageNumbers(): any[] {
    const innerWindow = 1;
    const outerWindow = 0;
    let windowFrom = this.paginationData.currentPage - innerWindow;
    let windowTo = this.paginationData.currentPage + innerWindow;

    // If the window is truncated on one side, make the other side longer
    if (windowTo > this.paginationData.totalPages) {
      windowFrom = Math.max(
        0,
        windowFrom - (windowTo - this.paginationData.totalPages),
      );
      windowTo = this.paginationData.totalPages;
    }
    if (windowFrom < 1) {
      windowTo = Math.min(
        this.paginationData.totalPages,
        windowTo + (1 - windowFrom),
      );
      windowFrom = 1;
    }

    let visible = [];

    // Always show the first page
    visible.push(1);
    // Don't add inner window pages twice
    for (let i = 2; i <= Math.min(1 + outerWindow, windowFrom - 1); i++) {
      visible.push(i);
    }
    // If the gap is just one page, close the gap
    if (1 + outerWindow == windowFrom - 2) {
      visible.push(windowFrom - 1);
    }
    // Don't add the first or last page twice
    for (
      var i = Math.max(2, windowFrom);
      i <= Math.min(windowTo, this.paginationData.totalPages - 1);
      i++
    ) {
      visible.push(i);
    }
    // If the gap is just one page, close the gap
    if (this.paginationData.totalPages - outerWindow == windowTo + 2) {
      visible.push(windowTo + 1);
    }
    // Don't add inner window pages twice
    for (
      let i = Math.max(
        this.paginationData.totalPages - outerWindow,
        windowTo + 1,
      );
      i < this.paginationData.totalPages;
      i++
    ) {
      visible.push(i);
    }
    // Always show the last page, unless it's the first page
    if (this.paginationData.totalPages > 1) {
      visible.push(this.paginationData.totalPages);
    }

    var links = [];

    let prev = null;

    for (let i = 0, l = visible.length; i < l; i++) {
      if (prev && visible[i] > prev + 1) {
        links.push(-1);
      }
      links.push(visible[i]);
      prev = visible[i];
    }
    return links;
  }

  protected paginateTo(paginate: any): void {
    if (paginate.source == "arrow") {
      if (paginate.pageIndex == -1 && this.paginationData.currentPage == 1) {
        return;
      }
      if (
        paginate.pageIndex == 1 &&
        this.paginationData.currentPage == this.paginationData.totalPages
      ) {
        return;
      }
      this.paginationData.currentPage =
        this.paginationData.currentPage + paginate.pageIndex;
    } else {
      if (this.paginationData.currentPage == paginate.pageIndex) {
        return;
      }
      this.paginationData.currentPage = paginate.pageIndex;
    }
    this.paginationData.pages = this.visiblePageNumbers();
    this.paginationData = Object.assign({}, this.paginationData);
    this.cardDataChunk = this.getSlice(this.paginationData.currentPage);
  }

  protected updatePerPageVal(ppgSelected: any): void {
    // Reset to page 1
    this.paginationData.currentPage = 1;
    this.paginationData.perPage = ppgSelected.ppgValue;
    this.paginationData.pages = this.visiblePageNumbers();
    this.paginationData = Object.assign({}, this.paginationData);
  }
}
