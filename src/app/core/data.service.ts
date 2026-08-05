import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  EMPTY,
  expand,
  filter,
  Observable,
  switchMap,
  take,
  throwIfEmpty,
  timer,
} from "rxjs";

import { SummaryResponse } from "../search/result-section/result-section.model";
import { UniProtEntry } from "../search/result-section/uniprot-data.model";
import { ConfigurationService } from "./configuration.service";

@Injectable({
  providedIn: "root",
})
export class DataService {
  apiUrls = {};

  private readonly POLL_MS = 30000;
  private readonly MAX_POLLS = 20;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigurationService,
  ) {}

  getUniProtSummary(uniprotAccession: string): Observable<any> {
    return this.httpClient.get<SummaryResponse>(
      this.configService.getUniProtSummaryUrl() + uniprotAccession + ".json",
    );
  }

  getUniProtEntry(uniprotAccession: string): Observable<any> {
    return this.httpClient.get<UniProtEntry>(
      this.configService.getUniProtApiUrl() + uniprotAccession,
    );
  }

  submitSequenceSearch(sequence: string): Observable<any> {
    return this.httpClient.post(this.configService.getSequenceSearchUrl(), {
      sequence: sequence,
    });
  }

  getSequenceSearchResult(jobId: string): Observable<any> {
    const request$ = () =>
      this.httpClient.get<any>(
        `${this.configService.getSequenceSearchResultUrl()}?job_id=${jobId}`,
      );

    return request$().pipe(
      expand((response) =>
        response.message?.startsWith("Search in progress")
          ? timer(this.POLL_MS).pipe(switchMap(() => request$()))
          : EMPTY,
      ),
      take(this.MAX_POLLS),
      filter((response) => !response.message?.startsWith("Search in progress")),
      take(1),
      throwIfEmpty(() => new Error("Timed out waiting for search results")),
    );
  }

  getEnsemblSearchResult(ensemblid: string): Observable<any> {
    return this.httpClient.get(
      this.configService.getEnsemblSearchResultUrl() + ensemblid + ".json",
    );
  }
}
