import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from 'src/app/models/post.model';
import { UserModel } from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [PostService]
})
export class PostsComponent implements OnInit {
  posts: PostModel[];
  userModel: UserModel;
  userId;
  isOwner: boolean;
  pages: number;
  total: number;
  status: string;
  constructor(private postService: PostService, private userService: UserService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    const username = this.activatedRoute.parent.snapshot.paramMap.get('id');
    this.userModel = new UserModel ('','','','',username,'','');

    this.userService.getUser(this.userModel).subscribe(
      response => {
          this.userModel.id = response.user._id;
          this.postService.getPostsProfile(this.userModel).subscribe(
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