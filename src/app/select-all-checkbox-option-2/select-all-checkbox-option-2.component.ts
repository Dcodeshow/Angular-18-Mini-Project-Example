import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialsModule } from '../materials/materials.module';

@Component({
  selector: 'app-select-all-checkbox-option-2',
  standalone: true,
  imports: [MaterialsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './select-all-checkbox-option-2.component.html',
  styleUrl: './select-all-checkbox-option-2.component.scss',
})
export class SelectAllCheckboxOption2Component {
  form!: FormGroup;
  IssuesList: any[] = [];
  selectAllChecked = false;
  checkedAll = false;
  apiUrl = 'http://localhost:3000/checklist';
  apiUrlList = 'http://localhost:3000/IssueListSelected';
  isSubmitted = false;
  isDataLoaded = false;
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      checkList: [null, Validators.required],
    });
    this.issuesClause();
    setTimeout(() => {
      console.log(this.IssuesList);
    }, 1000);
    this.getSubmittedChecklist();
  }

  getSubmittedChecklist() {
    this.http
      .get<any>('http://localhost:3000/IssueListSelected')
      .subscribe((res) => {
        console.log(res);
        if (res?.length && res[0].checkList.isUndertakingSubmitted === 'Y') {
          this.applySubmittedState(res[0].checkList);
        }
        // 🔥 data ready
        this.isDataLoaded = true;
      });
  }

  applySubmittedState(data: any) {
    // 1️⃣ form control patch
    this.form.get('checkList')?.setValue(data);

    // 2️⃣ Select All ON
    this.checkedAll = true;
    this.selectAllChecked = true;

    // 3️⃣ Saare checklist checked
    this.IssuesList.forEach((issue) => {
      issue.checked = true;
    });

    // 4️⃣ UI disable
    this.isSubmitted = true;
  }

  toggleSelectAll($event: any) {
    this.checkedAll = $event.checked;
    this.IssuesList.forEach((issue) => {
      issue.checked = this.checkedAll;
    });
    if (this.checkedAll) {
      this.patchChecklistObject();
    } else {
      this.form.get('checkList')?.setValue(null);
    }
    //this.checkedAll = this.checkedAll;
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
    if (this.checkedAll) {
      this.patchChecklistObject();
    } else {
      this.form.get('checkList')?.setValue(null);
    }
  }

  patchChecklistObject() {
    const checklistPayload = {
      isUndertakingSubmitted: 'Y',
      ipoId: 10256,
      mbId: '56',
    };

    this.form.get('checkList')?.setValue(checklistPayload);
  }

  onSubmit() {
    if (this.form.invalid) return;

    const payload = {
      ...this.form.value,
      // yahan baaki payload fields bhi aa sakte hain
    };
    this.http.post(this.apiUrlList, payload).subscribe((response) => {
      console.log('Form submitted successfully', response);
      alert('Form submitted successfully');
      this.isSubmitted = true;
      // 🔥 PATCH UI after success
      this.applySubmittedState(payload);
    });
  }
}
