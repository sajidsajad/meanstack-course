import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'mean-stack';
  // storedPosts: Post[] = [];

  // onPostAdded(post) {
  // this.storedPosts.push(post);
  // this.storedPosts.push(number); //will show an error because of using interface 'Post'
  // }

  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.autoAuthUser();
  }


}
