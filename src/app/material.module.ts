import { NgModule } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatMenuModule } from "@angular/material/menu";
import { MatTableModule } from "@angular/material/table";
import { MatRadioModule } from "@angular/material/radio";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSortModule } from "@angular/material/sort";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatIconModule } from "@angular/material/icon";
import { MatSliderModule } from "@angular/material/slider";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatChipsModule } from "@angular/material/chips";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  exports: [
    MatButtonModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTooltipModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatMenuModule,
    MatTableModule,
    MatCheckboxModule,
    MatSortModule,
    MatExpansionModule,
    MatBottomSheetModule,
    MatSlideToggleModule,
    MatIconModule,
    MatSliderModule,
    MatProgressBarModule,
    MatCardModule,
    MatInputModule,
    MatDatepickerModule,
    MatChipsModule,
  ],
})
export class MaterialModule {}
