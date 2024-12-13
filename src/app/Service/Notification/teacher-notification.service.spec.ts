import { TestBed } from '@angular/core/testing';

import { TeacherNotificationService } from './teacher-notification.service';

describe('TeacherNotificationService', () => {
  let service: TeacherNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
