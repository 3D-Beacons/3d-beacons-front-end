import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingDialogComponent } from './components/loading-dialog/loading-dialog.component';



@NgModule({
  declarations: [LoadingDialogComponent],
  imports: [
    CommonModule
  ],
  exports: [LoadingDialogComponent]
})
export class SharedModule { }
