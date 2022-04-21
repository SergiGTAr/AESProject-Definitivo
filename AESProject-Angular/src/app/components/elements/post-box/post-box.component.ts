import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from 'src/app/models/post.model';

@Component({
  selector: 'app-post-box',
  templateUrl: './post-box.component.html',
  styleUrls: ['./post-box.component.scss']
})
export class PostBoxComponent implements OnInit {
    comments: string[];
    @Input() post: any;

    constructor() {
      
    }
    
    ngOnInit(): void {
        this.comments = ['a', 'b'];
    }
}