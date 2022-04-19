import { Component, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/post.model';
import { UserModel } from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [PostService]
})
export class PostsComponent implements OnInit {
  posts: PostModel[];
  user: UserModel;
  isOwner: boolean;
  pages: number;
  total: number;
  status: string;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPostsProfile(this.user).subscribe(
      response => {
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

    this.isOwner = true;
  }
}