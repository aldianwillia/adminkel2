import { TestBed } from '@angular/core/testing';

import { SuratnikahService } from './suratnikah.service';

describe('SuratnikahService', () => {
  let service: SuratnikahService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuratnikahService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
