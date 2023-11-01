import { TestBed } from '@angular/core/testing';

import { CofreService } from './cofre.service';

describe('CofreService', () => {
  let service: CofreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CofreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
