import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostCardListComponent } from './blog-post-card-list.component';

describe('BlogPostListComponent', () => {
  let component: BlogPostCardListComponent;
  let fixture: ComponentFixture<BlogPostCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostCardListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogPostCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
