import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherAddUpdateComponent } from './teacher-add-update.component';

describe('TeacherAddUpdateComponent', () => {
  let component: TeacherAddUpdateComponent;
  let fixture: ComponentFixture<TeacherAddUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherAddUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeacherAddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
