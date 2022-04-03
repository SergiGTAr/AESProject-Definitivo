export class UserModel {
    name: string;
    surname: string;
    nick: string;
    email: string;
    password: string;

    constructor(name: string, surname: string, nick: string, email: string, password: string) {
        this.name = name;
        this.surname = surname;
        this.nick = nick;
        this.email = email;
        this.password = password;
    }
}
