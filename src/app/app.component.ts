import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MaterialsModule } from './materials/materials.module';
import { SelectAllCheckboxComponent } from './select-all-checkbox/select-all-checkbox.component';
import { SaveDraftFormComponent } from './save-draft-form/save-draft-form.component';
import { ChildComponent } from './child/child.component';
import { UploadFileInAngularComponent } from './upload-file-in-angular/upload-file-in-angular.component';
import { SelectAllCheckboxOption2Component } from './select-all-checkbox-option-2/select-all-checkbox-option-2.component';

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
    ChildComponent,
    UploadFileInAngularComponent,
    SelectAllCheckboxOption2Component,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
