import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostPage } from './blog-post-page.component';

describe('BlogPostPageComponent', () => {
  let component: BlogPostPage;
  let fixture: ComponentFixture<BlogPostPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostPage],
    }).compileComponents();
    fixture = TestBed.createComponent(BlogPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
