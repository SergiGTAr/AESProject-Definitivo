import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/post.model';
import { UserModel } from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PostService]
})
export class HomeComponent implements OnInit {
  posts: PostModel[];
  user: UserModel;
  status: string;
  page: number = 1;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPostsHome(this.page).subscribe(
      response => {
          //this.identity = response.user;
          this.posts = response.posts;
          this.status = 'success';
      },
      error => {
          const errorMessage = error as any;
          console.log(errorMessage);
          if (errorMessage != null) {
              this.status = 'error';
          }
      }
    );
  }
}
