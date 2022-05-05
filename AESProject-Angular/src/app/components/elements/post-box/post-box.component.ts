import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-post-box',
  templateUrl: './post-box.component.html',
  styleUrls: ['./post-box.component.scss'],
  providers: [CommentService]
})
export class PostBoxComponent implements OnInit {
    comments: string[];
    isCommenting: boolean;
    status: string;
    @Input() post: any;

    constructor(private commentService: CommentService) {
      
    }
    
    ngOnInit(): void {
      this.commentService.getCommentsPost(this.post._id).subscribe(
          response => {
              this.comments = response.comments;
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
 
    clickComment(isCommenting: boolean) {
      this.isCommenting = isCommenting;
    }

}