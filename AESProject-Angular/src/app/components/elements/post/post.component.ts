import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
    owner: boolean;
    liked: boolean;
    userphoto;
    user: string;
    date: string;
    content: string;
    likes: string;
    comments: string;

    constructor() { }

    clickLiked(): void {
      this.liked = !this.liked;
    }

    ngOnInit(): void {
        const date: Date = new Date();
        this.user = 'Adje Reeves';
        this.date = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        this.content = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex eañ';
        this.likes = String(204124).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        this.comments = String(4562).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
}