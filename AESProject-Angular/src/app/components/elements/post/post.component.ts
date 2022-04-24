import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/post.model';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    providers: [UserService]
})
export class PostComponent implements OnInit {
    @Input() post: any;
    postModel: PostModel;
    userModel: UserModel;
    status: string;
    isOwner: boolean;
    isLiked: boolean;

    constructor(private userService : UserService) {
    }

    clickLiked(): void {
      this.isLiked = !this.isLiked;
    }

    ngOnInit(): void {
      const identity = JSON.parse(localStorage.getItem('identity'));
      this.userModel = new UserModel (this.post.user,'','','','','','');
      this.userService.getUser(this.userModel).subscribe(
        response => {
            this.userModel.username = response.user.username;
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

      const date: Date = new Date(this.post.created_at);
      const dateString: string = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;

      this.postModel = new PostModel();
      this.postModel.user = this.userModel;
      this.postModel.content = this.post.content;
      this.postModel.created_at = dateString;
      this.postModel.likes = String(204124).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      this.postModel.comments = String(4562).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
}
