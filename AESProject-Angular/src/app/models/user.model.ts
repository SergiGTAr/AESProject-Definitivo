export class UserModel {
    name: string;
    surname: string;
    sex: string;
    username: string;
    email: string;
    password: string;

    constructor(name: string, surname: string, sex: string, username: string, email: string, password: string) {
        this.name = name;
        this.surname = surname;
        this.sex = sex;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
