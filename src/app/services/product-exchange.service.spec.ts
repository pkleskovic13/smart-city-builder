import { TestBed } from '@angular/core/testing';

import { ProductExchangeService } from './product-exchange.service';

describe('ProductExchangeService', () => {
  let service: ProductExchangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductExchangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
