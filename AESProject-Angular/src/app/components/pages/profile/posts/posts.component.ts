import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  owner: boolean
  constructor() { }

  ngOnInit(): void {
    this.owner = true;
  }
}