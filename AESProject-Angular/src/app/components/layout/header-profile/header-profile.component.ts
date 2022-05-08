import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent implements OnInit {
  profilePage: string
  status: string
  identity: any
  userModel: UserModel
  isOwner: boolean

  constructor(private activatedRoute : ActivatedRoute) { }

    ngOnInit(): void {
        const username = this.activatedRoute.parent.snapshot.paramMap.get('id');
        this.profilePage = this.activatedRoute.snapshot.url[0].path;
        this.identity = JSON.parse(localStorage.getItem('identity'));

        if (username === this.identity.username) {
            this.isOwner = true;
        }

        this.userModel = new UserModel("", "", "", "", username, "", "");
    }
}
