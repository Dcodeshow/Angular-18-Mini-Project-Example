import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
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
  IssuesList: any[] = [];
  selectAllChecked = false;
  checkedAll = false;
  apiUrl = 'http://localhost:3000/checklist';
  apiUrlList = 'http://localhost:3000/IssueList';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      checkList: ['', Validators.required],
    });
    this.issuesClause();
  }

  toggleSelectAll($event: any) {
    this.checkedAll = $event.checked;
    this.IssuesList.forEach((issue) => {
      issue.checked = this.checkedAll;
    });
    this.checkedAll = this.checkedAll;
  }

  issuesClause() {
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.IssuesList = data.map((issue) => ({
        ...issue,
        checked: false,
      }));
    });
  }

  onSingleSelect(issue: any, $event: any) {
    issue.checked = $event.checked;
    this.selectAllChecked = this.IssuesList.every((i) => i.checked);
    this.checkedAll = this.selectAllChecked;
  }

  onSubmit() {
    const selectedIds = this.IssuesList.filter((i) => i.checked).map(
      (i) => i.id
    );

    // 👇 yahin form me push ho raha hai
    this.form.patchValue({
      checkList: selectedIds,
    });
    console.log(this.form.value);
  }
}
