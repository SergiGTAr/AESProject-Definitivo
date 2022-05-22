import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private userService: UserService, private activatedRoute : ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        const username = this.activatedRoute.parent.snapshot.paramMap.get('id');
        this.profilePage = this.activatedRoute.snapshot.url[0].path;
        this.identity = JSON.parse(localStorage.getItem('identity'));

        if (username === this.identity.username) {
          this.isOwner = true;
        }

        if (!this.isOwner && this.profilePage == 'config') {
          this.router.navigate(['/profile/' + username + '/posts']);
        }

        this.userModel = new UserModel("", "", "", "", username, "", "");
    }

    follow() {
      this.userService.getUser(this.userModel).subscribe(
        response => {
            this.userModel.id = response.user._id;
            this.followUser();
            this.status = 'success';
        },
        error => {
            const errorMessage = error as any;
            console.log(errorMessage);
            if (errorMessage != null) {
                this.status = 'error';
            }
        }
      );
    }

    followUser() {
      this.userService.newFollow(this.userModel.id).subscribe(
        response => {
              this.status = 'success';
            },
        error => {
            const errorMessage = error as any;
            console.log(errorMessage);
            if (errorMessage != null) {
                this.status = 'error';
            }
        }
      );
    }
}
