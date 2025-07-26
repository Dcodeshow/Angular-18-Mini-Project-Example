import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss',
})
export class ReactiveFormComponent {
  title = 'Angular18';
  myForm!: FormGroup;
  private fb: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.formInitialize();
    this.myForm.valueChanges.subscribe((a) => {
      const formValue = this.myForm.value;
      let { fname, mname, lname } = formValue;
      let fullName = fname + ' ' + mname + ' ' + lname;
      this.myForm.patchValue({ fullName: fullName }, { emitEvent: false });
    });
  }

  constructor() {}

  formInitialize() {
    this.myForm = this.fb.group({
      fname: ['', [Validators.required]],
      mname: [''],
      lname: [''],
      fullName: [''],
      isWorking: ['No'],
      jobType: [],
      isOwnBusiness: [],
      companyDetails: this.fb.group({
        companyName: [],
        position: [],
        salary: [],
      }),
      businessDetails: this.fb.group({
        businessName: [],
        businessType: [],
        businessIncome: [],
        businessAddress: [],
      }),
      personalEmail: [],
      officialEmail: [],
      mobileNo: this.fb.array([this.addMobileNumber()]),
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
    //console.log(this.mobileNumber.value);
  }

  get mobileNumber(): FormArray {
    return this.myForm.get('mobileNo') as FormArray;
  }

  addMobileNumber() {
    return this.fb.group({
      mobile: ['', [Validators.required]],
    });
  }

  add() {
    this.mobileNumber.push(this.addMobileNumber());
  }

  delete(del: any) {
    this.mobileNumber.removeAt(del);
  }
}
