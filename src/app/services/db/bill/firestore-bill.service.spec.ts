import { TestBed } from '@angular/core/testing';

import { FirestoreBillService } from './firestore-bill.service';

describe('FirestoreBillService', () => {
  let service: FirestoreBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
