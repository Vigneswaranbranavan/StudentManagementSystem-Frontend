import { TestBed } from '@angular/core/testing';

import { TeacherTimetableService } from './teacher-timetable.service';

describe('TeacherTimetableService', () => {
  let service: TeacherTimetableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherTimetableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
