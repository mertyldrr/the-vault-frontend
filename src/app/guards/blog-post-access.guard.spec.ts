import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { BlogPostAccessGuard } from './blog-post-access.guard';

describe('blogPostAccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      BlogPostAccessGuard(...guardParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
