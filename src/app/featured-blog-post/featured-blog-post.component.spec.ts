import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedBlogPostComponent } from './featured-blog-post.component';

describe('FeaturedBlogPostComponent', () => {
  let component: FeaturedBlogPostComponent;
  let fixture: ComponentFixture<FeaturedBlogPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedBlogPostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedBlogPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
