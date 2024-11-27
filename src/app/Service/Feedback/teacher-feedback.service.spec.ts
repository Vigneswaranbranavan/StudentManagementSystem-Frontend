import { TestBed } from '@angular/core/testing';

import { TeacherFeedbackService } from './teacher-feedback.service';

describe('TeacherFeedbackService', () => {
  let service: TeacherFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
