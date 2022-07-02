import { TestBed } from '@angular/core/testing';

import { PermintaanService } from './permintaan.service';

describe('PermintaanService', () => {
  let service: PermintaanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermintaanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
