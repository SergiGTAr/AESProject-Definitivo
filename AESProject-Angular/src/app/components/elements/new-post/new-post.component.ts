import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  owner: boolean;
  constructor() { }

  ngOnInit(): void {
    this.owner = true;
  }

}
