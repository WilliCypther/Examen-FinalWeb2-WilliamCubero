import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChoferesComponent } from './choferes/choferes.component';
import { LicenseSelectorComponent } from './license-selector/license-selector.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ChoferesComponent,
    LicenseSelectorComponent
  ],
  imports: [
    CommonModule,
    ChoferesModule,MatDialogModule,
  ]
})
export class ChoferesModule { }
