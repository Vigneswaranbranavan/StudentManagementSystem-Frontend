import { TestBed } from '@angular/core/testing';

import { ViewSubjectService } from './view-subject.service';

describe('ViewSubjectService', () => {
  let service: ViewSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
