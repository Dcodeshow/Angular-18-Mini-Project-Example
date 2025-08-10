import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  getAllEmployee() {
    return this.http.get('http://localhost:3000/EmployeeDetails');
  }

  ceateEmployee(payload: any) {
    return this.http.post('http://localhost:3000/EmployeeDetails', payload);
  }
}
