import { Component } from '@angular/core';
import { ClientsService } from './clients.service';
import { NgFor } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { take } from 'rxjs';

@Component({
  selector: 'app-dependent-dropdown',
  standalone: true,
  imports: [NgFor, FormsModule, ReactiveFormsModule],
  templateUrl: './dependent-dropdown.component.html',
  styleUrl: './dependent-dropdown.component.scss',
})
export class DependentDropdownComponent {
  allClientData: any[] = [];
  clientID: any;
  form: FormGroup;

  clients: any[] = [];
  site: any[] = [];
  buildings: any[] = [];
  floors: any[] = [];

  constructor(private clientService: ClientsService, private fb: FormBuilder) {
    this.form = this.fb.group({
      client: [''],
      site: [''],
      building: [''],
      floor: [''],
    });
  }

  ngOnInit(): void {
    this.LoadClientData();
  }

  LoadClientData() {
    this.clientService.GetAllClients().subscribe((Response: any) => {
      this.allClientData = Response.data;
      console.log(Response);
    });
  }

  onSave() {
    console.log(this.form.value);
  }
}
