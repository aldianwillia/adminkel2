import { TestBed } from '@angular/core/testing';

import { DataPendudukService } from './data-penduduk.service';

describe('DataPendudukService', () => {
  let service: DataPendudukService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPendudukService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
