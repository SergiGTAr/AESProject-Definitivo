import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PostService]
})
export class HomeComponent implements OnInit {
  posts: any[];
  user: UserModel;
  status: string;
  page: number = 1;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getPostsHome(this.page).subscribe(
      response => {
          //this.identity = response.user;
          this.posts = response.posts as any[];
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
