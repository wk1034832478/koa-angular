import { TestBed } from '@angular/core/testing';

import { UserUserviceService } from './user-uservice.service';

describe('UserUserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserUserviceService = TestBed.get(UserUserviceService);
    expect(service).toBeTruthy();
  });
});
