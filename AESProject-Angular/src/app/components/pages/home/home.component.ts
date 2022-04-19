import {Component, OnInit} from '@angular/core';
import {PostModel} from 'src/app/models/post.model';
import {UserModel} from 'src/app/models/user.model';
import {PostService} from 'src/app/services/post.service';
import {UserService} from 'src/app/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [PostService]
})
export class HomeComponent implements OnInit {

    constructor(private postService: PostService, private userService: UserService) {
        this.identity = this.userService.identifyUser();
        this.token = this.userService.getToken();
        this.page = 1;
    }

    posts: PostModel[];
    user: UserModel;
    status: string;
    page;
    identity;
    token;
    totalPosts;
    pages;
    noMorePosts = false;


    ngOnInit(): void {
        this.getPosts(this.page);
    }

    getPosts(page, adding = false) {
        this.postService.getPostsHome(page, this.token).subscribe(
            response => {
                if (response.posts) {
                    this.posts = response.posts;
                    this.totalPosts = this.posts.length;
                    this.pages = this.totalPosts / 10;

                    if (!adding) {
                        this.posts = response.posts;
                    } else {
                        const postsJaMostrats = this.posts;
                        const postsNous = response.posts;
                        this.posts = postsJaMostrats.concat(postsNous);
                    }


                    this.status = 'success';
                } else {
                    this.status = 'error';
                }
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

    loadMore() {
        if (this.posts.length === this.totalPosts) {
            this.noMorePosts = true;
        } else {
            this.page += 1;
        }
        this.getPosts(this.page, true);
    }
}
