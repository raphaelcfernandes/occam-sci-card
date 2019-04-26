import { TestBed } from '@angular/core/testing';

import { OccamRequesterService } from './occam-requester.service';

describe('OccamRequesterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OccamRequesterService = TestBed.get(OccamRequesterService);
    expect(service).toBeTruthy();
  });
});
