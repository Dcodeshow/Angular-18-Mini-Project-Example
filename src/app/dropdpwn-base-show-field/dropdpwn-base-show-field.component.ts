import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialsModule } from '../materials/materials.module';

@Component({
  selector: 'app-dropdpwn-base-show-field',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, MaterialsModule],
  templateUrl: './dropdpwn-base-show-field.component.html',
  styleUrl: './dropdpwn-base-show-field.component.scss',
})
export class DropdpwnBaseShowFieldComponent {
  promotersForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.promotersForm = this.fb.group({
      promoters: this.fb.array([]),
    });

    // add one row by default
    this.addPromoter();
  }

  // getter for form array
  get promotersFormArray(): FormArray {
    return this.promotersForm.get('promoters') as FormArray;
  }

  // create promoter form group
  createPromoter(data: any = {}): FormGroup {
    return this.fb.group({
      name: [data.name || '', Validators.required],
      promotertypeid: [data.promotertypeid || '', Validators.required],
      address: [data.address || '', Validators.required],
      passportnumber: [data.passportnumber || ''],
      lienumber: [data.lienumber || ''],
    });
  }

  // add promoter
  addPromoter(): void {
    const group = this.createPromoter();
    this.promotersFormArray.push(group);

    // subscribe to changes of promotertypeid for dynamic validator
    group.get('promotertypeid')?.valueChanges.subscribe(() => {
      this.onPromoterTypeChange(group);
    });
  }

  // remove promoter
  removePromoter(index: number): void {
    this.promotersFormArray.removeAt(index);
  }

  // dynamic validator
  onPromoterTypeChange(promoter: FormGroup): void {
    const type = promoter.get('promotertypeid')?.value?.toLowerCase();

    if (type && type.includes('company')) {
      promoter.get('lienumber')?.setValidators([Validators.required]);
    } else {
      promoter.get('lienumber')?.clearValidators();
    }
    promoter.get('lienumber')?.updateValueAndValidity();
  }

  // submit
  onSubmit(): void {
    console.log(this.promotersForm.value);
  }

  // Show passport number only if type = individual
  isIndividualSelected(index: number): boolean {
    const promoter = this.promotersFormArray.at(index);
    return (
      promoter.get('promotertypeid')?.value?.toLowerCase() === 'individual'
    );
  }

  // Show lie number only if type = company
  isCompanySelected(index: number): boolean {
    const promoter = this.promotersFormArray.at(index);
    return promoter.get('promotertypeid')?.value?.toLowerCase() === 'company';
  }
}
