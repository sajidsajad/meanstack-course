// import { Component, Input, OnInit } from '@angular/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
//OnInit is lifecycle hook

import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  // posts = [
  //   {title: 'first', content: 'first post'},
  //   {title: 'second', content: 'second post'},
  //   {title: 'third', content: 'third post'}
  // ];

  // @Input() posts: Post [] = [];
  posts: Post [] = [];
  private postsSub: Subscription;

  //------------------------- START ----------------
  // postsService: PostsService

  // constructor(postsService: PostsService) {
  //   this.postsService = postsService;
  // }
  //------------------------- END --------------------
  // to avoid cumbersome for above lines START to END, we use following syntax:

  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    // this.posts = this.postsService.getPosts();
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  onDelete(postId: string){
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe(); // unsubscribe the subscription & prevents memory leaks
  }

}
