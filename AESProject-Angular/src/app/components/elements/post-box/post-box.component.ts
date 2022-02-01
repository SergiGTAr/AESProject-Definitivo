import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-box',
  templateUrl: './post-box.component.html',
  styleUrls: ['./post-box.component.scss']
})
export class PostBoxComponent implements OnInit {
    comments: string[];
    constructor() {
    }
    ngOnInit(): void {
        this.comments = ['a', 'b'];
    }
}
