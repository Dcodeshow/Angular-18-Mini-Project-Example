import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentDropdownComponent } from './dependent-dropdown.component';

describe('DependentDropdownComponent', () => {
  let component: DependentDropdownComponent;
  let fixture: ComponentFixture<DependentDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DependentDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DependentDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
