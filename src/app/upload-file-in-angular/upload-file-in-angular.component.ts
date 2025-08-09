import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-file-in-angular',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './upload-file-in-angular.component.html',
  styleUrl: './upload-file-in-angular.component.scss',
})
export class UploadFileInAngularComponent {
  uploadedFile: string[] = [];
  base64String: string = '';
  constructor(private http: HttpClient) {}

  uploadFile(event: any) {
    const file = event.target.files[0];

    if (
      (file.type === 'image/png' || file.type === 'image/jpeg') &&
      file.size > 0
    ) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;

        const payload = {
          fileName: file.name,
          fileType: file.type,
          base64Data: base64String,
        };

        this.http.post('http://localhost:3000/fileUpload', payload).subscribe({
          next: (response: any) => {
            console.log('File saved as base64 in JSON server', response);
            this.uploadedFile.push(response);
            console.log('Uploaded file:', this.uploadedFile);
          },
          error: (error) => {
            console.error('Error saving file to JSON server', error);
          },
        });
      };
      reader.readAsDataURL(file); // Convert to base64
    } else {
      alert('Please upload a valid image file (PNG or JPEG).');
    }
  }
}
