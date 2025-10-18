import { Component } from '@angular/core';
import { MaterialsModule } from '../materials/materials.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-save-draft-form',
  standalone: true,
  imports: [MaterialsModule, ReactiveFormsModule],
  templateUrl: './save-draft-form.component.html',
  styleUrl: './save-draft-form.component.scss',
})
export class SaveDraftFormComponent {
  detailsForm!: FormGroup;
  apiUrl = 'http://localhost:3000/userForms';
  userId = 'user123';
  draftId: number | null = null;
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.detailsForm = this.fb.group({
      fullName: ['', Validators.required],
      address: [''],
      phone: [''],
      message: [''],
      status: ['draft'],
    });
    this.loadDraft();
  }

  loadDraft() {
    this.http
      .get<any[]>(`${this.apiUrl}?userId=${this.userId}&status=draft`)
      .subscribe((data) => {
        if (data.length > 0) {
          const draft = data[0];
          this.draftId = draft.id;
          this.detailsForm.patchValue(draft.formData);
        }
      });
  }

  saveDraft() {
    const payload = {
      userId: this.userId,
      formData: this.detailsForm.value,
      status: 'draft',
    };
    if (this.draftId) {
      this.http
        .put(`${this.apiUrl}/${this.draftId}`, payload)
        .subscribe(() => alert('Draft updated!'));
    } else {
      this.http.post(this.apiUrl, payload).subscribe((res: any) => {
        this.draftId = res.id;
        alert('Draft saved!');
      });
    }
  }

  submitForm() {
    const payload = {
      userId: this.userId,
      formData: this.detailsForm.value,
      status: 'submitted',
    };

    if (this.draftId) {
      // ✅ Update existing draft record to submitted
      this.http.put(`${this.apiUrl}/${this.draftId}`, payload).subscribe({
        next: () => {
          alert('Form submitted successfully!');
          this.detailsForm.reset({ status: 'draft' });
          this.draftId = null;
        },
        error: (err) => console.error(err),
      });
    } else {
      // ✅ If no draft, create new submitted record
      this.http.post(this.apiUrl, payload).subscribe({
        next: () => {
          alert('Form submitted successfully!');
          this.detailsForm.reset({ status: 'draft' });
          this.draftId = null;
        },
        error: (err) => console.error(err),
      });
    }
  }
}
