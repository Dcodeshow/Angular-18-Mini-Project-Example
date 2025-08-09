import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFileInAngularComponent } from './upload-file-in-angular.component';

describe('UploadFileInAngularComponent', () => {
  let component: UploadFileInAngularComponent;
  let fixture: ComponentFixture<UploadFileInAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadFileInAngularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadFileInAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
