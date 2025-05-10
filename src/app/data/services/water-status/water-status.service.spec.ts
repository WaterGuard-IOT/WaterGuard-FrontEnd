import { TestBed } from '@angular/core/testing';

import { WaterStatusService } from './water-status.service';

describe('WaterStatusService', () => {
  let service: WaterStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaterStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
