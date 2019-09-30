import { Role } from "./Role";


export class User {
    constructor() {
        this.roles = new Array<Role>();
    }
    id: string;
    name: string;
    family: string;
    username: string;
    password: string;
    Deactivated: boolean;
    roles: Array<Role>;

}