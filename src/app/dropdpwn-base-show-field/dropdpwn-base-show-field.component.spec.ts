import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdpwnBaseShowFieldComponent } from './dropdpwn-base-show-field.component';

describe('DropdpwnBaseShowFieldComponent', () => {
  let component: DropdpwnBaseShowFieldComponent;
  let fixture: ComponentFixture<DropdpwnBaseShowFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdpwnBaseShowFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdpwnBaseShowFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
