import { Route } from "@angular/router";
import { DocsComponent } from "./docs/docs.component";
import { GuidelinesComponent } from "./guidelines/guidelines.component";
import { HomeComponent } from "./home/home.component";
import { EnsemblComponent } from "./search/ensembl/ensembl.component";
import { SearchComponent } from "./search/search.component";
import { SequenceComponent } from "./search/sequence/sequence.component";

export const appRoutes: Route[] = [
  { path: "", component: HomeComponent },
  { path: "docs", component: DocsComponent },
  { path: "guidelines", component: GuidelinesComponent },
  { path: "search/:id", component: SearchComponent },
  { path: "sequence/:id", component: SequenceComponent },
  { path: "sequence", component: SequenceComponent },
  { path: "ensembl/:id", component: EnsemblComponent },
];
