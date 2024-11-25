import { TestBed } from '@angular/core/testing';

import { ViewclassService } from './viewclass.service';

describe('ViewclassService', () => {
  let service: ViewclassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewclassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
