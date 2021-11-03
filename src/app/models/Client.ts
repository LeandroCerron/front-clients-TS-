export class Client {
    name: string;
    lastName: string;
    email: string;
    telephone: Number;

    constructor(name: string, lastName: string, email: string, telephone: Number){
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.telephone = telephone;
    }
}