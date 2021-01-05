import { TestBed } from '@angular/core/testing';

import { FirestoreProductService } from './firestore-product.service';

describe('FirestoreProductService', () => {
  let service: FirestoreProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
