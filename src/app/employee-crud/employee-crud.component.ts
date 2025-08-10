import { Component, inject } from '@angular/core';
import { EmployeeService } from './employee.service';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-employee-crud',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './employee-crud.component.html',
  styleUrl: './employee-crud.component.scss',
})
export class EmployeeCrudComponent {
  private employeeService = inject(EmployeeService);
  private fb = inject(FormBuilder);
  employeeForm!: FormGroup;
  EmpRelatives!: FormGroup;
  familyList: any[] = [];
  expression: boolean = false;
  allEmployeeDetails: any[] = [];
  viewEdit: boolean = true;

  ngOnInit(): void {
    this.initilizeForm();
  }

  initilizeForm() {
    this.employeeForm = this.fb.group({
      Name: ['', Validators.required],
      ContactNo: ['', Validators.required],
      Email: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      PinCode: ['', Validators.required],
      Designation: ['', Validators.required],
    });

    this.EmpRelatives = this.fb.group({
      relName: ['', Validators.required],
      relRelation: ['', Validators.required],
      relAge: ['', [Validators.required, Validators.min(1)]],
    });
  }

  addRelatives() {
    if (this.EmpRelatives.valid) {
      this.familyList.push(this.EmpRelatives.value);
      this.EmpRelatives.reset();
    } else {
      this.EmpRelatives.markAllAsTouched();
    }
  }

  onDelete(index: number) {
    if (confirm('Are you sure you want to delete this relative?')) {
      this.familyList.splice(index, 1);
    }
  }

  // Button enable/disable logic
  get isSaveDisabled() {
    return !(this.employeeForm.valid && this.familyList.length > 0);
  }

  onSubmit() {
    if (this.employeeForm.valid && this.familyList.length > 0) {
      const payload = {
        ...this.employeeForm.value,
        EmpRelatives: this.familyList,
      };
      this.employeeService.ceateEmployee(payload).subscribe((response) => {
        console.log(response);
      });
      console.log(this.familyList);
      this.employeeForm.reset();
      alert('Employee Saved! Check console for payload.');
    } else {
      this.employeeForm.markAllAsTouched();
      this.EmpRelatives.markAllAsTouched();
      alert(
        'Please fill all required fields and add at least one family member.'
      );
    }
  }

  viewAllEmployee() {
    this.expression = !this.expression;
    if (this.viewEdit) {
      this.viewEdit = false;
      this.getAllEmployee();
    } else {
      this.viewEdit = true;
    }
  }

  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe((response: any) => {
      this.allEmployeeDetails = response;
      console.log(this.allEmployeeDetails);
    });
  }

  editEmployee(index: any) {
    const employee = this.allEmployeeDetails[index];
  }
}
