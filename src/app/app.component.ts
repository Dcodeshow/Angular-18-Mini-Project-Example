import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MaterialsModule } from './materials/materials.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, MaterialsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
