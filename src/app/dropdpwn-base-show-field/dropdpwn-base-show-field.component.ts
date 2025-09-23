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

    this.addPromoter(); // add initial row
  }

  get promotersFormArray(): FormArray {
    return this.promotersForm.get('promoters') as FormArray;
  }

  createPromoter(data: any = {}): FormGroup {
    const group = this.fb.group({
      name: [data.name || '', Validators.required],
      promotertypeid: [data.promotertypeid || '', Validators.required],
      address: [data.address || '', Validators.required],
      passportnumber: [{ value: data.passportnumber || '', disabled: true }],
      lienumber: [{ value: data.lienumber || '', disabled: true }],
    });

    // Subscribe to changes
    group.get('promotertypeid')?.valueChanges.subscribe(() => {
      this.updateFieldState(group);
    });

    // 👇 Run once initially for default row
    this.updateFieldState(group);

    return group;
  }

  addPromoter(): void {
    this.promotersFormArray.push(this.createPromoter());
  }

  removePromoter(index: number): void {
    this.promotersFormArray.removeAt(index);
  }

  updateFieldState(promoter: FormGroup): void {
    const type = promoter.get('promotertypeid')?.value?.toLowerCase();

    // Reset validators & disable both
    promoter.get('passportnumber')?.clearValidators();
    promoter.get('passportnumber')?.disable();
    promoter.get('lienumber')?.clearValidators();
    promoter.get('lienumber')?.disable();

    if (type === 'individual') {
      promoter.get('passportnumber')?.setValidators([Validators.required]);
      promoter.get('passportnumber')?.enable();
    } else if (type === 'company') {
      promoter.get('lienumber')?.setValidators([Validators.required]);
      promoter.get('lienumber')?.enable();
    }

    // Update validity
    promoter.get('passportnumber')?.updateValueAndValidity();
    promoter.get('lienumber')?.updateValueAndValidity();
  }

  onSubmit(): void {
    console.log(this.promotersForm.value);
  }
}
