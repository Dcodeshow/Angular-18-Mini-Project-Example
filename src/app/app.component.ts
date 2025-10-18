import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MaterialsModule } from './materials/materials.module';
import { SelectAllCheckboxComponent } from './select-all-checkbox/select-all-checkbox.component';
import { SaveDraftFormComponent } from './save-draft-form/save-draft-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgIf,
    MaterialsModule,
    SelectAllCheckboxComponent,
    SaveDraftFormComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
