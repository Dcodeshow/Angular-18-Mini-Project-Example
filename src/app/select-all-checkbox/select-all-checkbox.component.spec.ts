import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAllCheckboxComponent } from './select-all-checkbox.component';

describe('SelectAllCheckboxComponent', () => {
  let component: SelectAllCheckboxComponent;
  let fixture: ComponentFixture<SelectAllCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAllCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAllCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
