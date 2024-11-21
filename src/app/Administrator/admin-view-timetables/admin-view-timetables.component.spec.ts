import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewTimetablesComponent } from './admin-view-timetables.component';

describe('AdminViewTimetablesComponent', () => {
  let component: AdminViewTimetablesComponent;
  let fixture: ComponentFixture<AdminViewTimetablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewTimetablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewTimetablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
