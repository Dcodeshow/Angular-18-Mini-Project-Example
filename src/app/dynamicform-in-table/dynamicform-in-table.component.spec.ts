import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicformInTableComponent } from './dynamicform-in-table.component';

describe('DynamicformInTableComponent', () => {
  let component: DynamicformInTableComponent;
  let fixture: ComponentFixture<DynamicformInTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicformInTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicformInTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
