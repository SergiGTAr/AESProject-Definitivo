import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  enableProfileOptions: boolean;
  enableSearchBar: boolean;

  constructor() { }

  ngOnInit(): void {

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

