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
  apiUrl = 'http://localhost:3000/checklist';
  apiUrlList = 'http://localhost:3000/IssueList';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      checkList: ['', Validators.required],
    });
    this.issuesClause();
    setTimeout(() => {
      console.log(this.IssuesList);
    }, 2000);
  }

  toggleSelectAll($event: any) {
    let checked = $event.checked;
    this.IssuesList.forEach((issue) => {
      issue.checked = checked;
    });
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
    let checked = $event.checked;
    issue.checked = checked;
    if (!$event.checked) {
      // 👇 ek bhi unchecked mila → Select All false
      this.selectAllChecked = false;
    } else {
      // 👇 sab checked hain ya nahi check karo
      this.selectAllChecked = this.IssuesList.every((i) => i.checked);
    }
  }

  onSubmit() {
    const selected = this.IssuesList.filter((i) => i.checked);
    console.log('Selected Issues:', selected);
  }
}
