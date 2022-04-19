import {Component, OnInit} from '@angular/core';

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

    constructor() {
    }

    clickLiked(): void {
        this.liked = !this.liked;
    }

    ngOnInit(): void {
        const date: Date = new Date();
        this.user = 'Adje Reeves';
        this.date = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} ${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        this.content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
        this.likes = String(204124).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        this.comments = String(4562).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
}
