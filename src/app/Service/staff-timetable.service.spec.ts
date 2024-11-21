import { TestBed } from '@angular/core/testing';

import { StaffTimetableService } from './staff-timetable.service';

describe('StaffTimetableService', () => {
  let service: StaffTimetableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffTimetableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
