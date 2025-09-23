import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MaterialsModule } from '../materials/materials.module';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-select-all-checkbox',
  standalone: true,
  imports: [MaterialsModule, ReactiveFormsModule, NgFor],
  templateUrl: './select-all-checkbox.component.html',
  styleUrl: './select-all-checkbox.component.scss',
})
export class SelectAllCheckboxComponent {
  form!: FormGroup;
  items: any[] = [];
  selectAllChecked = false;
  apiUrl = 'http://localhost:3000/checklist';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      checkList: this.fb.array([]),
    });

    this.loadData();

    // 👇 Listen for changes
    this.form.valueChanges.subscribe(() => {
      this.updateSelectAllState();
    });
  }

  get checkListFormArray(): FormArray {
    return this.form.get('checkList') as FormArray;
  }

  loadData() {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.items = data;
      this.setCheckboxes();
    });
  }

  setCheckboxes() {
    this.checkListFormArray.clear();
    this.items.forEach((item) => {
      this.checkListFormArray.push(
        this.fb.group({
          id: item.id,
          text: item.text,
          checked: item.checked,
        })
      );
    });

    this.updateSelectAllState();
  }

  toggleSelectAll(event: any) {
    console.log(event.checked);
    this.selectAllChecked = event.checked;
    this.checkListFormArray.controls.forEach((ctrl) => {
      ctrl.patchValue({ checked: this.selectAllChecked }, { emitEvent: false });
    });
  }

  updateSelectAllState() {
    const allChecked = this.checkListFormArray.controls.every(
      (ctrl) => ctrl.value.checked
    );
    this.selectAllChecked = allChecked;
  }

  onSubmit() {
    const selected = this.checkListFormArray.value.filter(
      (x: any) => x.checked
    );

    console.log('Selected Items:', selected);

    // Example: PATCH checked state to JSON server
    this.checkListFormArray.controls.forEach((ctrl) => {
      const value = ctrl.value;
      this.http
        .patch(`${this.apiUrl}/${value.id}`, { checked: value.checked })
        .subscribe();
    });

    alert('Submitted Successfully!');
  }
}
