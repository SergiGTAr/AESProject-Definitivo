import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  identity: any;
  enableProfileOptions: boolean;
  enableSearchBar: boolean;

  constructor() { }

  ngOnInit(): void {
    this.identity = JSON.parse(localStorage.getItem('identity'));
  }

  showSearchBar(): void {
    if (this.enableProfileOptions) {
      this.enableProfileOptions = false;
    }

    this.enableSearchBar = !this.enableSearchBar;
  }

  showProfileOptions(): void {
    if (this.enableSearchBar) {
      this.enableSearchBar = false;
    }

    this.enableProfileOptions = !this.enableProfileOptions;
  }
}
