import { TestBed } from '@angular/core/testing';

import { ODService } from './od.service';

describe('ODService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ODService = TestBed.get(ODService);
    expect(service).toBeTruthy();
  });
});
