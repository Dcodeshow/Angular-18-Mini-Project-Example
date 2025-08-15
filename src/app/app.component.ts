import { UploadFileInAngularComponent } from './upload-file-in-angular/upload-file-in-angular.component';
import { NgFor, NgIf } from '@angular/common';
import { validate } from './../../node_modules/webpack/types.d';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DependentDropdownComponent } from './dependent-dropdown/dependent-dropdown.component';
import { DynamicformInTableComponent } from './dynamicform-in-table/dynamicform-in-table.component';
import { AdvanceInlineTableEditingComponent } from './advance-inline-table-editing/advance-inline-table-editing.component';
import { ApiCallingComponent } from './api-calling/api-calling.component';
import { EmployeeCrudComponent } from './employee-crud/employee-crud.component';
import { RowValueAddControlComponent } from './row-value-add-control/row-value-add-control.component';
import { MaterialsModule } from './materials/materials.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    DependentDropdownComponent,
    DynamicformInTableComponent,
    AdvanceInlineTableEditingComponent,
    ApiCallingComponent,
    NgIf,
    UploadFileInAngularComponent,
    EmployeeCrudComponent,
    RowValueAddControlComponent,
    MaterialsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
