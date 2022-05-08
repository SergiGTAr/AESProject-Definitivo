import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostModel} from 'src/app/models/post.model';
import {UserModel} from 'src/app/models/user.model';
import {PostService} from 'src/app/services/post.service';
import {UserService} from 'src/app/services/user.service';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss'],
    providers: [PostService]
})
export class PostsComponent implements OnInit {
  posts: PostModel[];
  userModel: UserModel;
  identity: any;
  isOwner: boolean;
  pages: number;
  total: number;
  status: string;
  constructor(private postService: PostService, private userService: UserService, private activatedRoute : ActivatedRoute) { }

    ngOnInit(): void {
        const username = this.activatedRoute.parent.snapshot.paramMap.get('id');
        this.identity = JSON.parse(localStorage.getItem('identity'));
        if (username === this.identity.username) {
            this.isOwner = true;
        }

        this.userModel = new UserModel("", "", "", "", username, "", "");
        this.trobarIDUsuari();
    }

    trobarIDUsuari(){
        this.userService.getUser(this.userModel).subscribe(
            response => {
                this.userModel.id = response.user._id;
                this.trobarPostsUsuari();
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

    trobarPostsUsuari(){
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
    }
}
