import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBlogPostPage } from './edit-blog-post-page.component';

describe('EditBlogPostComponent', () => {
  let component: EditBlogPostPage;
  let fixture: ComponentFixture<EditBlogPostPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBlogPostPage],
    }).compileComponents();

    fixture = TestBed.createComponent(EditBlogPostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
