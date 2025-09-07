import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechADMComponent } from './tech-adm.component';

describe('TechADMComponent', () => {
  let component: TechADMComponent;
  let fixture: ComponentFixture<TechADMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechADMComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechADMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
