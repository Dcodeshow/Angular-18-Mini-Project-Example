import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCallingComponent } from './api-calling.component';

describe('ApiCallingComponent', () => {
  let component: ApiCallingComponent;
  let fixture: ComponentFixture<ApiCallingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiCallingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiCallingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
