import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAllCheckboxOption2Component } from './select-all-checkbox-option-2.component';

describe('SelectAllCheckboxOption2Component', () => {
  let component: SelectAllCheckboxOption2Component;
  let fixture: ComponentFixture<SelectAllCheckboxOption2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAllCheckboxOption2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAllCheckboxOption2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
