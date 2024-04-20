import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPostsPage } from './my-posts-page.component';

describe('MyPostsComponent', () => {
  let component: MyPostsPage;
  let fixture: ComponentFixture<MyPostsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPostsPage],
    }).compileComponents();
    fixture = TestBed.createComponent(MyPostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
