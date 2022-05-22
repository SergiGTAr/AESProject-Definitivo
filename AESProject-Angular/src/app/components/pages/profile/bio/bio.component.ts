import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.scss']
})
export class BioComponent implements OnInit {
  identity: any
  status: string
  userModel: UserModel

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.userModel = new UserModel("", "", "", "", this.identity.username, "", "");
    
    this.userService.getUser(this.userModel).subscribe(
      response => {
          if (response.user.bio === undefined || response.user.bio === "") {
            this.userModel.bio = "There's no biography for this user";
          } else {
            this.userModel.bio = response.user.bio;
          }
          if (response.user.birth !== undefined) {
            this.userModel.birth = new Date(response.user.birth);
          }
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

  getBirth() {
    if (this.userModel.birth === undefined) {
      return "There's no birth date for this user"
    } else {
      return `Born on: ${String(this.userModel.birth.getDate()).padStart(2, '0')}/${String(this.userModel.birth.getMonth() + 1).padStart(2, '0')}/${this.userModel.birth.getFullYear()}`
    }
  }
}
