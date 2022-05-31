import {Component, OnInit} from '@angular/core';
import {UserModel} from 'src/app/models/user.model';
import {MessageModel} from '../../../models/message.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ChatService} from '../../../services/chat.service';
import {UserService} from '../../../services/user.service';
import {GLOBAL} from '../../../services/global';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    title: string;
    message: MessageModel;
    identity: any;
    token: string;
    users: any[];
    messages: any;
    status: string;
    userModel: UserModel;
    url: string;

    constructor(private route: ActivatedRoute, private router: Router, private chatService: ChatService, private userService: UserService) {

    }

    ngOnInit() {
        this.message = new MessageModel();
        this.identity = this.userService.identity;
        this.token = this.userService.token;
        //this.url = GLOBAL.url;
        this.users = this.identity.following;
    }

    clickUser(userModel: UserModel): void {
        this.messages = [{user:"1"},{user:"2"},{user:"3"},{user:"1"},{user:"2"},{user:"3"},{user:"1"},{user:"2"},{user:"3"},{user:"1"},{user:"2"},{user:"3"},{user:"1"},{user:"2"},{user:"3"},{user:"1"},{user:"2"},{user:"3"},{user:"1"},{user:"2"},{user:"3"},{user:"1"},{user:"2"},{user:"3"}];
        this.userModel = userModel
    }

    onSubmit(content: string) {
        this.message.text = content;
        this.chatService.addMessage(this.token, this.message).subscribe(
            response => {
                if (response) {
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
