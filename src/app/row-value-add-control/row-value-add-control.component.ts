import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialsModule } from '../materials/materials.module';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-row-value-add-control',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, MaterialsModule, TitleCasePipe],
  templateUrl: './row-value-add-control.component.html',
  styleUrl: './row-value-add-control.component.scss',
})
export class RowValueAddControlComponent {
  EmpRelatives!: FormGroup;
  familyList: any[] = [];
  private fb: FormBuilder = inject(FormBuilder);
  private http: HttpClient = inject(HttpClient);
  ngOnInit(): void {
    this.initilizeForm();
    this.getRelatives();
  }

  initilizeForm() {
    this.EmpRelatives = this.fb.group({
      relName: [{ value: 'Nawaz', disabled: true }],
      relRelation: ['', Validators.required],
      relAge: ['', [Validators.required, Validators.min(1)]],
    });
  }

  addRelatives() {
    const payload = this.EmpRelatives.getRawValue();
    if (this.EmpRelatives.valid) {
      this.http
        .post('http://localhost:3000/RowValue', payload)
        .subscribe((response: any) => {});
      this.EmpRelatives.reset({
        relName: 'Nawaz',
        relRelation: '',
        relAge: '',
      });
      this.getRelatives();
    } else {
      this.EmpRelatives.markAllAsTouched();
    }
  }

  getRelatives() {
    this.http
      .get('http://localhost:3000/RowValue')
      .subscribe((response: any) => {
        console.log(response); // Response structure देखें
        this.familyList = Array.isArray(response)
          ? response
          : response.data || [];
      });
  }
}
