import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
  providers: [PostService]
})
export class NewPostComponent implements OnInit {
  status: string;

  constructor(private postService : PostService) { }

  ngOnInit(): void {
    
  }

  onSubmit(content: string) {
    this.postService.savePost(content).subscribe(
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