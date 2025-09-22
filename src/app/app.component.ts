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
import { TechADMComponent } from './tech-adm/tech-adm.component';
import { DropdpwnBaseShowFieldComponent } from './dropdpwn-base-show-field/dropdpwn-base-show-field.component';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  promotersForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.promotersForm = this.fb.group({
      promoters: this.fb.array([]),
    });

    // add one promoter row by default
    this.addPromoter();
    console.log(this.promotersForm.value);
  }

  // getter
  get promotersFormArray(): FormArray {
    return this.promotersForm.get('promoters') as FormArray;
  }

  // create promoter group (without passport/lienumber initially)
  createPromoter(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      promotertypeid: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  // add promoter
  addPromoter(): void {
    const group = this.createPromoter();
    this.promotersFormArray.push(group);

    // subscribe to type change
    group.get('promotertypeid')?.valueChanges.subscribe((val: string) => {
      this.onTypeChange(group, val);
      console.log(this.promotersForm.value);
    });
  }

  // remove promoter
  removePromoter(index: number): void {
    this.promotersFormArray.removeAt(index);
  }

  // handle dropdown change
  onTypeChange(group: FormGroup, type: string): void {
    // remove both first
    if (group.get('passportnumber')) {
      group.removeControl('passportnumber');
    }
    if (group.get('lienumber')) {
      group.removeControl('lienumber');
    }

    // add based on type
    if (type?.toLowerCase() === 'individual') {
      group.addControl(
        'passportnumber',
        this.fb.control('', Validators.required)
      );
    } else if (type?.toLowerCase() === 'company') {
      group.addControl('lienumber', this.fb.control('', Validators.required));
    }
  }

  // submit
  onSubmit(): void {
    console.log(this.promotersForm.value);
  }
}
