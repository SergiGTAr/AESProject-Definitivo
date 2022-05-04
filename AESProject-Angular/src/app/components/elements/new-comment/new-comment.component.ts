import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.scss'],
  providers: [CommentService]
})
export class NewCommentComponent implements OnInit {
  status: string;
  
  constructor(private commentService : CommentService) { }

  ngOnInit(): void {
  }

  onSubmit(content: string) {
    this.commentService.saveComment(content).subscribe(
        response => {
            if (response) {
                this.status = 'success';
            } else {
                this.status = 'error';
            }
        },
        error => {
            console.log(error);
        }
    );
  }
}
