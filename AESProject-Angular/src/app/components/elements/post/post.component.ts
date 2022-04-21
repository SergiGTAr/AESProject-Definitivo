import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'src/app/models/post.model';
import { UserModel } from 'src/app/models/user.model';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    @Input() post: any;
    postModel: PostModel;
    userModel: UserModel;

    isOwner: boolean;
    isLiked: boolean;

    constructor() {
    }

    clickLiked(): void {
      this.isLiked = !this.isLiked;
    }

    ngOnInit(): void {
      const date: Date = new Date();

      this.postModel = new PostModel();
      this.postModel.user = this.userModel;
      this.postModel.content = this.post.content;
      this.postModel.created_at = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
      this.postModel.likes = String(204124).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      this.postModel.comments = String(4562).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
}
