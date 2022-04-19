export class UserModel {
    id: string;
    name: string;
    surname: string;
    sex: string;
    username: string;
    email: string;
    password: string;
    gettoken: any;

    constructor(id: string, name: string, surname: string, sex: string, username: string, email: string, password: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.sex = sex;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
