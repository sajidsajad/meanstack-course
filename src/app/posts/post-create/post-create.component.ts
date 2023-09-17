import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent {
  enteredTitle = "";
  enteredContent = "";

  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}


// USING COURSE TUTORIAL CONCEPTS BELOW:-

// // import { Component, EventEmitter, Output, OnInit } from '@angular/core';
// import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';

// import { Post } from '../post.model';
// import { PostsService } from '../posts.service';

// @Component({
//   selector: 'app-post-create',
//   templateUrl: './post-create.component.html',
//   styleUrls: ['./post-create.component.css']
// })
// export class PostCreateComponent implements OnInit {
//   //import this 'PostCreateComponent' in app.module.ts and also add this class in @NgModule under declarations key.
//   // enteredValue = '';
//   enteredTitle = '';
//   enteredContent = '';
//   // newPost = 'NO CONTENT';

//   // @Output() postCreated = new EventEmitter<Post>(); //interface Post

//   constructor(public postsService: PostsService) {}

//   ngOnInit(): void {
//   }

//   //* property-binding or string interpolation:
//   // onAddPost(postInput){
//   //   this.newPost = postInput.value;
//   // }

//   //* Two-way binding:
//   // onAddPost(){
//   //   this.newPost = this.enteredValue;
//   // }


//   onAddPost(form: NgForm){
//     // const post: Post = { //interface Post
//     //   title: this.enteredTitle,
//     //   content: this.enteredContent,
//     // };
//     if(form.invalid){
//       return;
//     }
//     // without Service:
//     // const post: Post = { //interface Post
//     //   title: form.value.title,
//     //   content: form.value.content,
//     // };
//     // this.postCreated.emit(post);
//     // with service:
//     this.postsService.addPost(form.value.title, form .value.content);
//     form.resetForm();

//   }

// }
