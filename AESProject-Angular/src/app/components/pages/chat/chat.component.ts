import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    identity: any;
    messages: any[];
    users: any[];
    isSelected: boolean;
    
    constructor() { }

    ngOnInit() {
        this.users = [{user:"1"},{user:"2"},{user:"3"},{user:"1"},{user:"2"},{user:"3"},{user:"1"},{user:"2"},{user:"3"},{user:"1"},{user:"2"},{user:"3"},{user:"1"},{user:"2"},{user:"3"},{user:"1"},{user:"2"},{user:"3"},{user:"1"},{user:"2"},{user:"3"},{user:"1"},{user:"2"},{user:"3"}];
        this.messages = [{user:"1"},{user:"2"},{user:"3"},{user:"1"},{user:"2"},{user:"3"},{user:"1"},{user:"2"},{user:"3"},{user:"1"},{user:"2"},{user:"3"},{user:"1"},{user:"2"},{user:"3"},{user:"1"},{user:"2"},{user:"3"},{user:"1"},{user:"2"},{user:"3"},{user:"1"},{user:"2"},{user:"3"}];
        this.identity = JSON.parse(localStorage.getItem('identity'));
    }

    clickUser(userModel: UserModel): void {
        //Mostrar chat 
    }

}
