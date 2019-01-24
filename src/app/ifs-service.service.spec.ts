import { TestBed } from '@angular/core/testing';

import { IfsServiceService } from './ifs-service.service';

describe('IfsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IfsServiceService = TestBed.get(IfsServiceService);
    expect(service).toBeTruthy();
  });
});
