import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    identity: any;
    messages: any[];
    users: any[];
    
    constructor() { }

    ngOnInit() {
        this.users = [{user:"1"},{user:"2"},{user:"3"}];
        this.messages = [{user:"1"},{user:"2"},{user:"3"}];
        this.identity = JSON.parse(localStorage.getItem('identity'));
    }

    clickUser(): void {
        
    }

}
