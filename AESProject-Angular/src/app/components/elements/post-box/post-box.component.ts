import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-box',
  templateUrl: './post-box.component.html',
  styleUrls: ['./post-box.component.scss']
})
export class PostBoxComponent implements OnInit {
    comments: string[];
    isCommenting: boolean;
    @Input() post: any;

    constructor() {
      
    }
    
    ngOnInit(): void {
        this.comments = ['a', 'b', 'A'];
    }
 
    clickComment(isCommenting: boolean) {
      this.isCommenting = isCommenting;
    }

    getCommentsByPost(){
      /*commentService(idPost){
        Response
        error
      }*/
    }
}