import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RowValueAddControlComponent } from './row-value-add-control.component';

describe('RowValueAddControlComponent', () => {
  let component: RowValueAddControlComponent;
  let fixture: ComponentFixture<RowValueAddControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RowValueAddControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RowValueAddControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
