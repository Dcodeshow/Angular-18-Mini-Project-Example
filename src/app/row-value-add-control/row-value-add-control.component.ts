import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  TemplateRef,
  ViewChild,
  viewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialsModule } from '../materials/materials.module';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-row-value-add-control',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, MaterialsModule, TitleCasePipe],
  templateUrl: './row-value-add-control.component.html',
  styleUrl: './row-value-add-control.component.scss',
})
export class RowValueAddControlComponent {
  EmpRelatives!: FormGroup;
  familyList: any[] = [];
  private fb: FormBuilder = inject(FormBuilder);
  private http: HttpClient = inject(HttpClient);
  isTableloaded: boolean = true;
  isAPICallingInProgress: boolean = false;
  @ViewChild('confirmDailog') confirmDialog!: TemplateRef<any>;
  @ViewChild('successDialog') successDialog!: TemplateRef<any>;
  readonly dialog = inject(MatDialog);
  subscription: Subscription[] = [];

  ngOnInit(): void {
    this.initilizeForm();
    this.getRelatives();
    console.log(this.EmpRelatives.controls);
  }

  initilizeForm() {
    this.EmpRelatives = this.fb.group({
      relName: [{ value: 'Nawaz', disabled: true }],
      relRelation: ['', Validators.required],
      relAge: ['', [Validators.required, Validators.min(1)]],
    });
  }

  addRelatives() {
    if (!this.isAPICallingInProgress) {
      const payload = this.EmpRelatives.getRawValue();
      if (this.EmpRelatives.valid) {
        this.isAPICallingInProgress = true;
        this.subscription.push(
          this.http
            .post('http://localhost:3000/RowValue', payload)
            .subscribe((response: any) => {
              this.EmpRelatives.reset({
                relName: 'Nawaz',
                relRelation: '',
                relAge: '',
              });
              this.getRelatives();
              this.isAPICallingInProgress = false;
            })
        );
      } else {
        this.EmpRelatives.markAllAsTouched();
      }
    }
  }

  getRelatives() {
    this.isTableloaded = true;
    this.subscription.push(
      this.http
        .get('http://localhost:3000/RowValue')
        .subscribe((response: any) => {
          this.familyList = Array.isArray(response)
            ? response
            : response.data || [];
          this.isTableloaded = false;
        })
    );
  }

  addLocation() {
    this.EmpRelatives.addControl(
      'location',
      this.fb.control('', Validators.required)
    );
    console.log(this.EmpRelatives.controls);
  }

  openDialog(i: any) {
    const dialogRef = this.dialog.open(this.confirmDialog, {
      width: '400px',

      panelClass: 'confirm-dialog',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // If confirmed, show success dialog
        const successRef = this.dialog.open(this.successDialog, {
          width: '400px',
          height: '50px',
          panelClass: 'success-dialog',
        });
        setTimeout(() => {
          successRef.close();
        }, 2000);
        this.subscription.push(
          this.http
            .delete(`http://localhost:3000/RowValue/${i.id}`)
            .subscribe((response: any) => {
              this.getRelatives();
            })
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
