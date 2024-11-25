import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffAddUpdateComponent } from './staff-add-update.component';

describe('StaffAddUpdateComponent', () => {
  let component: StaffAddUpdateComponent;
  let fixture: ComponentFixture<StaffAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffAddUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
