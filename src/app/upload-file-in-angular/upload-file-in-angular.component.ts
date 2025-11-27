import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FileuploadService } from './fileupload.service';
import moment from 'moment';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialsModule } from '../materials/materials.module';

@Component({
  selector: 'app-upload-file-in-angular',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, MaterialsModule],
  templateUrl: './upload-file-in-angular.component.html',
  styleUrl: './upload-file-in-angular.component.scss',
})
export class UploadFileInAngularComponent {
  form!: FormGroup;
  constructor(
    private http: HttpClient,
    private fileuploadService: FileuploadService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      attachment1: [null, Validators.required],
      attachment2: [null, Validators.required],
      uploadDate1: ['', Validators.required],
      uploadDate2: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.valid) {
      const formData = new FormData();
      Object.keys(this.form.controls).forEach((key) => {
        const value = this.form.get(key)?.value;
        console.log(value);
        formData.append(key, value);
      });
      console.log(this.form.value);
      this.fileuploadService.uploadFile(formData).subscribe((response: any) => {
        console.log('Upload success', response);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onFileChange(event: any, control: string, dateControl: string) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get(control)?.setValue(file);
      const formattedDate = moment().format('YYYY-MM-DD');
      this.form.get(dateControl)?.setValue(formattedDate);
      //this.form.get(dateControl)?.setValue(new Date());
      this.form.get(control)?.updateValueAndValidity();
    }
  }

  saveDraft() {}
}
