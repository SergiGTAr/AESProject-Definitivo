import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() user: any;
  @Input() isSelected: boolean;
  @Output() userListEmitter: EventEmitter<void> = new EventEmitter();
  
  userModel: UserModel;

  constructor() { }

  ngOnInit(): void {
  }

  clickUser(): void {
    this.userListEmitter.emit();
    this.isSelected = true;
  }

}
