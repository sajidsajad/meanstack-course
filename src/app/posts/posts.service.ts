import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from '../posts/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    // return this.posts; - to avoid reference of the values
    // return [...this.posts]; // spread operator will create copy of array posts
    //using http client: [Before MongoDB]
    // this.http.get<{message: string, posts: Post[]}>(
    //   'http://localhost:3000/api/posts'
    // )
    // .subscribe((postData) => {
    //   this.posts = postData.posts;
    //   this.postsUpdated.next([...this.posts]);
    // }); //subscribe as we are using observables
  

    // [After MongoDB]
    this.http.get<{message: string, posts: any}>(
      'http://localhost:3000/api/posts'
    )
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    .subscribe(transformedPosts => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    }); //subscribe as we are using observables
  }


  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }


  addPost(title: string, content: string){
    const post: Post = {id: null, title: title, content: content};
    this.http.post<{ message: string, postId: string }>('http://localhost:3000/api/posts', post)
        .subscribe(responseData => {
          // console.log(responseData.message);
          const id = responseData.postId;
          post.id = id;
          this.posts.push(post);
          this.postsUpdated.next([...this.posts]);
        });
  }


  deletePost(postId: string){
    this.http.delete('http://localhost:3000/api/posts/' + postId )
        .subscribe(() => {
          const updatedPosts = this.posts.filter(post => post.id !== postId); // only those ids which are not deleted
          this.posts = updatedPosts;
          this.postsUpdated.next([...this.posts]);
        });
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