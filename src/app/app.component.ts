import { UploadFileInAngularComponent } from './upload-file-in-angular/upload-file-in-angular.component';
import { NgFor, NgIf } from '@angular/common';
import { validate } from './../../node_modules/webpack/types.d';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
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
import { TechADMComponent } from './tech-adm/tech-adm.component';
import { DropdpwnBaseShowFieldComponent } from './dropdpwn-base-show-field/dropdpwn-base-show-field.component';
import { HttpClient } from '@angular/common/http';
import { SelectAllCheckboxComponent } from './select-all-checkbox/select-all-checkbox.component';

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
    TechADMComponent,
    DropdpwnBaseShowFieldComponent,
    SelectAllCheckboxComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
