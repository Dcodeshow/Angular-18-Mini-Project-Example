import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-api-calling',
  standalone: true,
  imports: [NgFor, FormsModule, ReactiveFormsModule],
  templateUrl: './api-calling.component.html',
  styleUrl: './api-calling.component.scss',
})
export class ApiCallingComponent {
  AllPost: any[] = [];
  userForm!: FormGroup;
  private http: HttpClient = inject(HttpClient);
  private fb: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.loadAllPost();
    this.initilizeForm();
  }

  initilizeForm() {
    this.userForm = this.fb.group({
      id: [Math.floor(Math.random() * 10) + 1],
      fName: [''],
      lName: [''],
      mobile: [''],
    });
  }

  loadAllPost() {
    this.http.get('http://localhost:3000/posts').subscribe({
      next: (res: any) => {
        this.AllPost = res;
        console.log(this.AllPost);
      },
      error: (err: any) => {
        console.log(err.message);
      },
      complete: () => {
        console.log('Request completed.');
      },
    });
  }

  addPost() {
    this.http
      .post('http://localhost:3000/posts', this.userForm.value)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.loadAllPost();
          this.userForm.reset();
          this.initilizeForm();
        },
        error: (err: any) => {
          console.log(err.message);
        },
        complete: () => {
          console.log('Post added successfully.');
        },
      });
  }

  deletePost() {}

  editPost() {}
}
