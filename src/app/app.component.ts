import { NgFor } from '@angular/common';
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    DependentDropdownComponent,
    DynamicformInTableComponent,
    AdvanceInlineTableEditingComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
