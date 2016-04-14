import {Component, Input, Output, ElementRef, EventEmitter, ViewChild, ContentChildren, Renderer, AfterViewInit} from 'angular2/core';
import {Post} from '../post';
import {PostService} from '../post.service';
//import {Editor, Header} from 'primeng/primeng';
//import {InputText} from 'primeng/primeng';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';


@Component({
  selector: 'post-edit',
  template: require('./post-edit.html'),
  styles: [require('./style.css')],
  //directives: [Editor, Header, InputText]
  directives: []  
})

export class PostEditComponent implements AfterViewInit{
  //@ViewChild('label') input: ElementRef;

  constructor(private _postService: PostService, private renderer: Renderer) {
      this.post = {title: "", content: ""};
  }
  
  ngAfterViewInit() {
      //console.log(this.input.nativeElement)
   // this.renderer.invokeElementMethod(this.input.nativeElement, 'focus', []);
  }

  log(x) {
  	console.log(x)
  }
  
  @Input()
  post: Post;
  
  @Input()
  mode: string;
  
  @Output() 
  savePost = new EventEmitter();
  
  @Output()
  createPost = new EventEmitter();
  
  @Output()
  updatePost = new EventEmitter();

  onCreate() {
      this.createPost.emit({});
  }

  onSubmit(form) {
    if (this.mode == "new") {
        this._postService.createPost({ 
            title: this.post.title, 
            content: this.post.content
        })
        .subscribe(post => {
            this.post = post;
            this.savePost.emit(post);
        });
    } 
    else if (this.mode == "edit") {
        this._postService.updatePost(this.post)
        .subscribe(posts => {
            this.savePost.emit({});
        });
    }
  }
}
