import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveDraftFormComponent } from './save-draft-form.component';

describe('SaveDraftFormComponent', () => {
  let component: SaveDraftFormComponent;
  let fixture: ComponentFixture<SaveDraftFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveDraftFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveDraftFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
