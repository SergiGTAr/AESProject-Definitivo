import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() user: string;
  @Output() userListEmitter: EventEmitter<UserModel> = new EventEmitter();
  
  userModel: UserModel;
  status: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userModel = new UserModel (this.user,'','','','','','');
    this.userService.getUser(this.userModel).subscribe(
      response => {
        this.userModel.name = response.user.name;
        this.userModel.surname = response.user.surname;
        this.userModel.username = response.user.username;
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

  clickUser(): void {
    this.userListEmitter.emit(this.userModel);
  }
}
