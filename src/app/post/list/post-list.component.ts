import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

import {Post} from '../post';
import {PostService} from '../post.service';

@Component({
  selector: 'post-list',
  template: require('./post-list.html')
})

export class PostListComponent {
  isActive: boolean;
  
  constructor() {
      this.isActive = true;
  }
    
  @Input()
  posts: Post[];
  
  @Output()
  createPost = new EventEmitter();
  
  @Output() 
  selectPost = new EventEmitter();
  
  @Output()
  deletePost = new EventEmitter();
  
  onCreate() {
      this.createPost.emit({});
  }
  
  onDelete(post) {
      this.deletePost.emit(post);
  }
  
  onSelect(post) {
      this.selectPost.emit(post);
  }
}