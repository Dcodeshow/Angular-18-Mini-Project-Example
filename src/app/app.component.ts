import { UploadFileInAngularComponent } from './upload-file-in-angular/upload-file-in-angular.component';
import { NgFor, NgIf } from '@angular/common';
import { validate } from './../../node_modules/webpack/types.d';
import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DependentDropdownComponent } from './dependent-dropdown/dependent-dropdown.component';
import { DynamicformInTableComponent } from './dynamicform-in-table/dynamicform-in-table.component';
import { AdvanceInlineTableEditingComponent } from './advance-inline-table-editing/advance-inline-table-editing.component';
import { ApiCallingComponent } from './api-calling/api-calling.component';
import { EmployeeCrudComponent } from './employee-crud/employee-crud.component';
import { RowValueAddControlComponent } from './row-value-add-control/row-value-add-control.component';
import { MaterialsModule } from './materials/materials.module';
import { TechADMComponent } from './tech-adm/tech-adm.component';
import { DropdpwnBaseShowFieldComponent } from './dropdpwn-base-show-field/dropdpwn-base-show-field.component';
import { HttpClient } from '@angular/common/http';
import { SelectAllCheckboxComponent } from './select-all-checkbox/select-all-checkbox.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    DependentDropdownComponent,
    DynamicformInTableComponent,
    AdvanceInlineTableEditingComponent,
    ApiCallingComponent,
    NgIf,
    UploadFileInAngularComponent,
    EmployeeCrudComponent,
    RowValueAddControlComponent,
    MaterialsModule,
    TechADMComponent,
    DropdpwnBaseShowFieldComponent,
    SelectAllCheckboxComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  selectedFile: File | null = null;
  isDragOver = false;
  uploadedFiles: any[] = [];
  apiUrl = 'http://localhost:3000/files';

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.validateFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
    if (event.dataTransfer?.files.length) {
      this.validateFile(event.dataTransfer.files[0]);
    }
  }

  validateFile(file: File) {
    if (file.type !== 'application/pdf') {
      alert('Only PDF files are allowed!');
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      alert('File size must be less than 50MB!');
      return;
    }
    this.selectedFile = file;
  }

  uploadFile() {
    if (!this.selectedFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;

      const payload = {
        name: this.selectedFile!.name,
        content: base64String,
      };

      this.http.post(this.apiUrl, payload).subscribe(() => {
        alert('File uploaded successfully!');
        this.selectedFile = null;
        this.loadFiles();
      });
    };
    reader.readAsDataURL(this.selectedFile);
  }

  removeFile() {
    this.selectedFile = null;
  }

  loadFiles() {
    this.http.get<any[]>(this.apiUrl).subscribe((files) => {
      this.uploadedFiles = files;
    });
  }

  ngOnInit() {
    this.loadFiles();
  }
}
