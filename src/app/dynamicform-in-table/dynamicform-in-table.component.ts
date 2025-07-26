import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-dynamicform-in-table',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor],
  templateUrl: './dynamicform-in-table.component.html',
  styleUrls: ['./dynamicform-in-table.component.scss'],
})
export class DynamicformInTableComponent {
  isCheckedAll: boolean = false;
  employeeForm!: FormGroup;
  ischecked: boolean = false;

  ngOnInit(): void {}

  SelectChecked() {
    this.isCheckedAll = this.getNewRow.controls.every(
      (control: any) => control.get('isChecked')?.value === true
    );
  }

  constructor(private fb: FormBuilder) {
    this.initilizeForm();
  }

  initilizeForm() {
    this.employeeForm = this.fb.group({
      tableRows: this.fb.array([this.createFormGroup()]),
    });
  }

  get getNewRow(): FormArray {
    return this.employeeForm.get('tableRows') as FormArray;
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      firsname: [''],
      lastname: [''],
      city: [''],
      state: [''],
      status: [''],
      isChecked: [false],
    });
  }

  addRow() {
    this.getNewRow.push(this.createFormGroup());
  }

  onSubmit() {
    console.log(this.employeeForm.value);
  }

  toggleAllSelection(e: any) {
    const checked = e.target.checked;
    this.getNewRow.controls.forEach((control) => {
      control.get('isChecked')?.setValue(checked);
    });
  }

  deleteRow() {
    const selectedRows = this.getNewRow.controls.filter(
      (control) => control.get('isChecked')?.value === true
    );

    if (selectedRows.length > 0) {
      selectedRows.forEach((row) => {
        const index = this.getNewRow.controls.indexOf(row);
        if (index > -1) {
          this.getNewRow.removeAt(index);
        }
      });
    } else {
      alert('Please select at least one row to delete.');
    }
  }
}
