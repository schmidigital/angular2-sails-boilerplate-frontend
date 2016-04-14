import {Component} from 'angular2/core';
import {HTTP_PROVIDERS} from 'angular2/http';

import {Post} from './post';
import {PostService} from './post.service';
import {PostEditComponent} from './edit';
import {PostListComponent} from './list';

/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

@Component({
  // Declare the tag name in index.html to where the component attaches
  selector: 'post',
  template: require('./post.html'),
  styles: [require('./post.css')],
  directives: [PostListComponent, PostEditComponent],
  providers: [HTTP_PROVIDERS, PostService]
})


export class PostComponent {
  posts : Post[];
  selectedPost: Post;
  mode: string;
  newPost: Post;
  
  isActive: boolean;

  constructor(private _postService: PostService) {
      this.isActive = true;
      this.selectedPost = {
          title: "haha",
          content: "hoho"
      }
      this.mode = "new";
   }

  ngOnInit() {
    this.getPosts();
  }
  
  getPosts() {
    this._postService.getPosts()
        .subscribe(posts => {
            this.posts = posts;
        });
  }

  createPost() {
    this.mode = "new";
    this.selectedPost = {
          title: "",
          content: ""
      }
  }
  
  savePost($event) {
      this.selectedPost = $event;
      this.getPosts();
  }

  selectPost($event) {
    this.mode = "edit";
    this.selectedPost = $event;
  }
  
  deletePost($event) {
    this._postService.deletePost($event)
        .subscribe(posts => {
            this.getPosts();
        });
  }
  
  updatePost($event) {
    this._postService.updatePost($event)
        .subscribe(posts => {
            this.getPosts();
        });
  }

}
