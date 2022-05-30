import {Component, OnInit} from '@angular/core';
import {UserModel} from 'src/app/models/user.model';
import {MessageModel} from '../../../models/message.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ChatService} from '../../../services/chat.service';
import {UserService} from '../../../services/user.service';
import {identity} from 'rxjs';
import {GLOBAL} from '../../../services/global';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    title: string;
    message: MessageModel;
    identity;
    token;
    url: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private messageService: ChatService,
        private userService: UserService
    ) {
    }

    ngOnInit() {
        this.message = new MessageModel('', '', '', '', '', '');
        this.identity = this.userService.identity;
        this.token = this.userService.token;
        this.url = GLOBAL.url;
    }

}
