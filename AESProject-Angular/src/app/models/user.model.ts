export class UserModel {
    userId: string;
    name: string;
    surname: string;
    sex: string;
    username: string;
    email: string;
    password: string;
    gettoken: any;

    constructor(userId: string, name: string, surname: string, sex: string, username: string, email: string, password: string) {
        this.userId = userId;
        this.name = name;
        this.surname = surname;
        this.sex = sex;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
