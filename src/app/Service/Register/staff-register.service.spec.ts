import { TestBed } from '@angular/core/testing';

import { StaffRegisterService } from './staff-register.service';

describe('StaffRegisterService', () => {
  let service: StaffRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
