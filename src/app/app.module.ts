import { BrowserModule, Title } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ResultSectionComponent } from './search/result-section/result-section.component';
import { SummarySectionComponent } from './search/result-section/summary-section/summary-section.component';
import { BeaconsInterceptor } from './beacons-interceptor';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { StructuresSectionComponent } from './search/structures-section/structures-section.component';
import { SharedModule } from './shared/shared.module';
import { DocsComponent } from './docs/docs.component';
import { ProvidersComponent } from './providers/providers.component';
import { GuidelinesComponent } from './guidelines/guidelines.component';
import { SequenceComponent } from './search/sequence/sequence.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppHeaderComponent } from './app-header/app-header.component';
import { SearchHeaderComponent } from './search-header/search-header.component';
import { SequenceCardsComponent } from './search/sequence/sequence-cards/sequence-cards.component';
import { EnsemblComponent } from './search/ensembl/ensembl.component';
import { SearchPaginationComponent } from './search/search-pagination/search-pagination.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'docs', component: DocsComponent },
  { path: 'guidelines', component: GuidelinesComponent },
  { path: 'search/:id', component: SearchComponent },
  { path: 'sequence/:id', component: SequenceComponent },
  { path: 'ensembl/:id', component: EnsemblComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultSectionComponent,
    SummarySectionComponent,
    HomeComponent,
    StructuresSectionComponent,
    StructuresSectionComponent,
    DocsComponent,
    ProvidersComponent,
    GuidelinesComponent,
    SequenceComponent,
    AppHeaderComponent,
    SearchHeaderComponent,
    SequenceCardsComponent,
    EnsemblComponent,
    SearchPaginationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    RouterModule.forRoot(routes, { scrollOffset: [0, 0], scrollPositionRestoration: "top", anchorScrolling: 'enabled' }),
    SharedModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BeaconsInterceptor, multi: true },
    Title
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
