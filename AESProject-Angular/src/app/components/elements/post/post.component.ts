import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PostModel } from 'src/app/models/post.model';
import { UserModel } from 'src/app/models/user.model';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    providers: [UserService, PostService]
})
export class PostComponent implements OnInit {
    @Input() post: any;
    @Output() commentEmitter: EventEmitter<boolean> = new EventEmitter();

    identity: any;
    postModel: PostModel;
    userModel: UserModel;
    status: string;
    isOwner: boolean;
    isLiked: boolean;
    isCommenting: boolean;
    constructor(private userService: UserService, private commentService: CommentService, private postService: PostService) {

    }

    ngOnInit(): void {
      this.identity = JSON.parse(localStorage.getItem('identity'));
      this.userModel = new UserModel (this.post.user,'','','','','','');

      if (this.identity._id == this.userModel.id) {
        this.isOwner = true;
      }

      this.userService.getUser(this.userModel).subscribe(
        response => {
            this.userModel.username = response.user.username;

            const date: Date = new Date(this.post.created_at);
            const dateString: string = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

            this.postModel = new PostModel();
            this.postModel.user = this.userModel;
            this.postModel.content = this.post.content;
            this.postModel.created_at = dateString;
            if (this.post.likes !== undefined) {
              this.postModel.likes = String(this.post.likes).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            } else {
              this.postModel.likes = String(0);
            }
            this.getComments();

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

    getComments() {
      this.commentService.getNumberComments(this.post._id).subscribe(
        response => {
            this.postModel.comments = String(response.comments).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
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

    clickLiked(): void {
      this.isLiked = !this.isLiked;
      if (this.isLiked) {
        this.postModel.likes = String(parseInt(this.postModel.likes) + 1).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      } else {
        this.postModel.likes = String(parseInt(this.postModel.likes) - 1).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      }

      this.postService.addLike(this.post._id).subscribe(
        response => {
            this.status = 'success';
        },
        error => {
            this.status = 'error';
        }
      );
      window.location.reload();
    }

    clickComment(): void {
      this.isCommenting = !this.isCommenting;
      this.commentEmitter.emit(this.isCommenting);
    }

    clickDelete(): void {
      this.postService.deletePost(this.post._id).subscribe(
        response => {
            this.status = 'success';
        },
        error => {
            this.status = 'error';
        }
      );
      window.location.reload();
    }
}
