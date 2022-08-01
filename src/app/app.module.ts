import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'docs', component: DocsComponent },
  { path: 'search/:id', component: SearchComponent }
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
    ProvidersComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    RouterModule.forRoot(routes),
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BeaconsInterceptor, multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
