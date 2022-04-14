import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
  private user: UserModel
  public status: string
  private identity: any
  public owner: any
  public isOwner: boolean

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    const url = this.router.url;
    const username = (url.split("/")[2]);

    this.user = new UserModel ("","","",username,"","");

    this.userService.getUser(this.user).subscribe(
      response => {
          if (response.username){
              this.owner = response.user;
              this.identity = JSON.parse(localStorage.getItem('identity'));

              if (this.owner._id === this.identity._id) {
                this.isOwner = true;
              }

              this.status = 'success';
          } else {
              this.status = 'error';
          }
      },
      error => {
          console.log(error);
      }
    );
  }
}