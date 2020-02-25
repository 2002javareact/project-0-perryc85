export class UserDTO{
    userid: number; 
    username: string; 
    password: string; 
    firstname: string; 
    lastname: string; 
    email: string; 
    role: string; 
    roleid: number;
    
    constructor(
        userid: number,
        username: string,
        password: string,
        firstname: string,
        lastname: string,
        email: string,
        role: string,
        roleid: number){
            this.userid = userid;
            this.username = username;
            this.password = password;
            this.firstname = firstname;
            this.lastname = lastname;
            this.email = email;
            this.role = role;
            this.roleid = roleid;
        }
}