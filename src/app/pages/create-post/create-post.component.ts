import { Component } from '@angular/core';
import { ContentChange, QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [QuillEditorComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent {
  constructor() {}

  onContentChanged($event: ContentChange) {
    console.log($event);
  }
}
