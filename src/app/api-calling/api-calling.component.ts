import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-api-calling',
  standalone: true,
  imports: [NgFor, FormsModule, ReactiveFormsModule, NgIf, TitleCasePipe],
  templateUrl: './api-calling.component.html',
  styleUrl: './api-calling.component.scss',
})
export class ApiCallingComponent {
  AllPost: any[] = [];
  userForm!: FormGroup;
  isUpdate: boolean = false;
  private http: HttpClient = inject(HttpClient);
  private fb: FormBuilder = inject(FormBuilder);
  userID: any;

  ngOnInit(): void {
    this.loadAllPost();
    this.initilizeForm();
    console.log(this.userForm);
  }

  initilizeForm() {
    this.userForm = this.fb.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      mobile: ['', Validators.required],
    });
  }

  loadAllPost() {
    this.http.get('http://localhost:3000/posts').subscribe({
      next: (res: any) => {
        this.AllPost = res;
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

  editPost(user: any) {
    this.userID = user.id;
    this.isUpdate = true;
    this.userForm.patchValue({
      fName: user.fName,
      lName: user.lName,
      mobile: user.mobile,
    });
  }

  updatePost() {
    this.http
      .put(`http://localhost:3000/posts/${this.userID}`, this.userForm.value)
      .subscribe((response) => {
        console.log(response);
        this.loadAllPost();
        this.userForm.reset();
      });
  }

  deletePost(user: any) {
    const confirm = window.confirm(
      'Are you sure you want to delete this post?'
    );
    if (confirm) {
      this.http
        .delete(`http://localhost:3000/posts/${user.id}`)
        .subscribe((response) => {
          console.log(response);
          this.loadAllPost();
          this.userForm.reset();
        });
    } else {
      console.log('Post deletion cancelled.');
    }
  }
}
