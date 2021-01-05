import { TestBed } from '@angular/core/testing';

import { FirestoreMarkerService } from './firestore-marker.service';

describe('FirestoreMarkerService', () => {
  let service: FirestoreMarkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreMarkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
