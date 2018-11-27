import { TestBed } from '@angular/core/testing';

import { SocialContactService } from './social-contact.service';

describe('SocialContactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SocialContactService = TestBed.get(SocialContactService);
    expect(service).toBeTruthy();
  });
});
