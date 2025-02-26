import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {
  MatHeaderCell,
  MatCell,
  MatRow,
  MatHeaderRow,
  MatTable,
} from '@angular/material/table';

import {
  MatCard,
  MatCardHeader,
  MatCardContent,
  MatCardTitle,
} from '@angular/material/card';

import { NombreApellidoPipe } from './pipes/nombre-apellido.pipe';
import { HeaderSizeDirective } from './directives/header-size.directive';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatLabel,
    MatHeaderCell,
    MatCell,
    MatRow,
    MatHeaderRow,
    MatTable,
  ],
  exports: [
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatFormField,
    MatLabel,
    MatHeaderCell,
    MatCell,
    MatRow,
    MatHeaderRow,
    MatTable,
    NombreApellidoPipe,
    HeaderSizeDirective,
    ToolbarComponent,
  ],
  declarations: [NombreApellidoPipe, HeaderSizeDirective, ToolbarComponent],
})
export class SharedModule {}
