import { Component, Input, OnInit } from '@angular/core';
import { CommentModel } from 'src/app/models/comment.model';
import { UserModel } from 'src/app/models/user.model';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers: [UserService]
})
export class CommentComponent implements OnInit {
    @Input() comment: any;

    identity: any;
    commentModel: CommentModel;
    userModel: UserModel;
    status: string;
    isOwner: boolean;

    constructor(private userService : UserService, private commentService : CommentService) {
    }

    ngOnInit(): void {
      this.identity = JSON.parse(localStorage.getItem('identity'));
      this.userModel = new UserModel (this.comment.user,'','','','','','');

      if (this.identity._id == this.userModel.id) {
        this.isOwner = true;
      }

      this.userService.getUser(this.userModel).subscribe(
        response => {
            this.userModel.username = response.user.username;

            const date: Date = new Date(this.comment.created_at);
            const dateString: string = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
      
            this.commentModel = new CommentModel();
            this.commentModel.user = this.userModel;
            this.commentModel.content = this.comment.content;
            this.commentModel.created_at = dateString;
            
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

    clickDelete(): void {
      this.commentService.deleteComment(this.comment._id).subscribe(
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
