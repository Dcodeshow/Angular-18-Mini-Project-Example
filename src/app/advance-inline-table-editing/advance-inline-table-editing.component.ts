import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-advance-inline-table-editing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './advance-inline-table-editing.component.html',
  styleUrl: './advance-inline-table-editing.component.scss',
})
export class AdvanceInlineTableEditingComponent {
  userArray: any;
  isUpdate: boolean = false;
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.loadAllUser();
  }

  loadAllUser() {
    this.http
      .get('https://jsonplaceholder.typicode.com/users')
      .subscribe((res: any) => {
        this.userArray = res;
      });
  }

  onEdit(user: any) {
    user.isEditing = true;
    console.log(user);
  }

  // Showing Error
  validateField(user: any) {
    if (user == '') {
      return true;
    } else {
      return false;
    }
  }

  //Showing update button
  validateForm(user: any) {
    if (
      user.name != '' &&
      user.username != '' &&
      user.phone != '' &&
      user.website != ''
    ) {
      return false;
    } else {
      return true;
    }
  }

  onCancel(user: any) {
    user.isEditing = false;
  }
}
