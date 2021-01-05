import { TestBed } from '@angular/core/testing';

import { FirestoreImageUploadService } from './firestore-image-upload.service';

describe('FirestoreImageUploadService', () => {
  let service: FirestoreImageUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreImageUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
