import { TestBed } from '@angular/core/testing';

import { SuratumumService } from './suratumum.service';

describe('SuratumumService', () => {
  let service: SuratumumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuratumumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
