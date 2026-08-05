import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
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
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class DataService {
  private readonly httpClient = inject(HttpClient);
  private readonly BASE_URL = environment.apiHost;
  private readonly UNIPROT_API_URL = environment.uniprotApiUrl;

  private readonly POLL_MS = 30000;
  private readonly MAX_POLLS = 20;

  getUniProtSummary(uniprotAccession: string): Observable<any> {
    return this.httpClient.get<SummaryResponse>(
      `${this.BASE_URL}/uniprot/summary/${uniprotAccession}.json`,
    );
  }

  getUniProtEntry(uniprotAccession: string): Observable<any> {
    return this.httpClient.get<UniProtEntry>(
      `${this.UNIPROT_API_URL}${uniprotAccession}`,
    );
  }

  submitSequenceSearch(sequence: string): Observable<any> {
    return this.httpClient.post(`${this.BASE_URL}/sequence/search/`, {
      sequence: sequence,
    });
  }

  getSequenceSearchResult(jobId: string): Observable<any> {
    const request$ = () =>
      this.httpClient.get<any>(
        `${this.BASE_URL}/sequence/result?job_id=${jobId}`,
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
      `${this.BASE_URL}/ensembl/summary/${ensemblid}.json`,
    );
  }

  getProviderColor(provider: string): string {
    switch (provider) {
      case "PDBe":
        return "#085f5c";
      case "SWISS-MODEL":
        return "#7474bf";
      case "PED":
        return "#2274a5";
      case "AlphaFold DB":
        return "#0053d6";
      case "SASBDB":
        return "rgb(255,99,163)";
      default:
        return "rgb(100,100,100)";
    }
  }
}
