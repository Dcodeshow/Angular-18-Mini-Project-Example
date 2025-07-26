import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceInlineTableEditingComponent } from './advance-inline-table-editing.component';

describe('AdvanceInlineTableEditingComponent', () => {
  let component: AdvanceInlineTableEditingComponent;
  let fixture: ComponentFixture<AdvanceInlineTableEditingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvanceInlineTableEditingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvanceInlineTableEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
