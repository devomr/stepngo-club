import { TestBed } from '@angular/core/testing';

import { GiftBagService } from './gift-bag.service';

describe('GiftBagService', () => {
  let service: GiftBagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiftBagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
