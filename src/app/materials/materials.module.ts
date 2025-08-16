import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';

const MATERIALS_COMPONENTS: any[] = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatTableModule,
  MatToolbarModule,
  MatCardModule,
  MatDialogModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, MATERIALS_COMPONENTS],
  exports: [MATERIALS_COMPONENTS],
})
export class MaterialsModule {}
