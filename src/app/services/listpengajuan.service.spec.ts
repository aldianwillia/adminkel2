import { TestBed } from '@angular/core/testing';

import { ListpengajuanService } from './listpengajuan.service';

describe('ListpengajuanService', () => {
  let service: ListpengajuanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListpengajuanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
