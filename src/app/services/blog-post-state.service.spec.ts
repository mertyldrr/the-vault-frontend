import { TestBed } from '@angular/core/testing';

import { BlogPostStateService } from './blog-post-state.service';

describe('BlogPostStateService', () => {
  let service: BlogPostStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogPostStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
