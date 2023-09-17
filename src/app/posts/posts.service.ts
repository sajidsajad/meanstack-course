import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from '../posts/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    // return this.posts; - to avoid reference of the values
    return [...this.posts]; // spread operator will create copy of array posts
  }


  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }


  addPost(title: string, content: string){
    const post: Post = {title: title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}

/* IMPORTANT NOTES

? What are Observables?
* Observables provide support for passing messages between parts of your application.   
* They are used frequently in Angular and are a technique for event handling, asynchronous programming, and handling multiple values. 

? What is the purpose of asObservables?
* The asObservable method is useful when we want to hide the Subject's methods when exposing it to consumers that should only use it as an Observable. 
* For example, we might expose the Subject in a service as an Observable, so components using that service will not be able to call the next method.

*/