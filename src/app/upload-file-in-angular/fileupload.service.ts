import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileuploadService {
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  uploadFile(payload: any) {
    return this.http.post('http://localhost:3000/fileUpload', payload);
  }
}
