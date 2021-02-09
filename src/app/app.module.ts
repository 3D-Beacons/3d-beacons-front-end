import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ResultSectionComponent } from './result-section/result-section.component';
import { SummarySectionComponent } from './result-section/summary-section/summary-section.component';
import { BeaconsInterceptor } from './beacons-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ResultSectionComponent,
    SummarySectionComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BeaconsInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
