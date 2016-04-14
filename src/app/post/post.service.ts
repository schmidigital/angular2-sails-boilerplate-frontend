import {Injectable} from 'angular2/core';
import {Http, Response, RequestOptions} from 'angular2/http';
import {Headers} from 'angular2/http';

import {Post} from './post';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {
  private _postsUrl = 'http://localhost:1337/post';

  constructor(private _http: Http) {}

  headers = new Headers({
      'authorization': `Bearer ${localStorage.getItem('jwt')}`
  })

  options = new RequestOptions({
      headers: this.headers
  })

  getPosts() : Observable<Post[]> {
    return this._http.get(this._postsUrl, this.options)
                    .map(res => <Post[]> res.json());
  }
  
  createPost(post: Post) : Observable<Post>  {
    return this._http.post(this._postsUrl, JSON.stringify(post), {
      headers: this.headers
    })
    .map(res => <Post>res.json());
  }
  
  updatePost(post: Post) : Observable<Post>  {
    return this._http.put(`${this._postsUrl}/${post.id}`, JSON.stringify(post), {
      headers: this.headers
    })
    .map(res => <Post>res.json());
  }
  
  deletePost(post: Post) : Observable<Post>  {
    return this._http.delete(`${this._postsUrl}/${post.id}`, {
      headers: this.headers
    })
    .map(res => <Post>res.json());
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
