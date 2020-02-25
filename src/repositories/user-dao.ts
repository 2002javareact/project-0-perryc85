import { PoolClient } from "pg";
import { connectionPool } from ".";
import { User } from "../models/User";
import { userDTOToUserConverter } from "../util/user-dto-to-user-converter";
import { BadCredentialsError } from "../erros/BadCredentialsError";
import { InternalServerError } from "../erros/InternalServerError";
import { UserNotFoundError } from "../erros/UserNotFoundError";
import { UserDTO } from "../dtos/UserDTO";


// this function gets anf formats all users
export async function daoFindAllUsers():Promise<User[]>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let results = await client.query('SELECT * FROM project_0."user"')
        return results.rows.map(userDTOToUserConverter)
    }catch(e){
        throw new InternalServerError()
    } finally {
        client && client.release()
    }

}

export async function daoFindUserByUsernameAndPassword(username:string,password:string):Promise<User>{
    let client:PoolClient// our potential connection to db
    try {
        client = await connectionPool.connect()
        // a paramaterized query
        let results = await client.query('SELECT * FROM project_0."user" U inner join project_0."role" R on U."role" = R.roleid  WHERE username = $1 and "password" = $2', [username, password])
        if(results.rowCount === 0){
            throw new Error('User Not Found')
        }
        return userDTOToUserConverter(results.rows[0])
    } catch(e){
        console.log(e);
        if(e.message === 'User Not Found'){
            throw new BadCredentialsError()
        }else {
            throw new InternalServerError()
        }
    } finally {
        client && client.release()
    }
}

export async function daoFindUserById(id:number):Promise<User>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM project_0."user" U inner join project_0."role" R on U."role" = R.roleid WHERE U.userid = $1', [id])
        if(result.rowCount === 0){
            throw new Error('User Not Found')
        }
        return userDTOToUserConverter(result.rows[0])

    }catch(e){
        // id DNE
        //need if for that
        if(e.message ==='User Not Found'){
            throw new UserNotFoundError()
        }
        throw new InternalServerError()
    } finally {
        client && client.release()
    }
}

// function that saves a new user and returns that user with its new id
export async function daoUpdateOneUser(newUser:UserDTO):Promise<User> {
    let client:PoolClient
    try { 
        client = await connectionPool.connect()
        // send a query and immeadiately get the role id matching the name on the dto
        let roleId = (await client.query('SELECT * FROM project_0.roles WHERE role = $1', [newUser.role])).rows[0].roleid
        // send an insert that uses the id above and the user input
        let result = await client.query('INSERT INTO project_0.users (username, "password", firstname, lastname, email, "role") values ($1,$2,$3,$4,$5,$6) RETURNING userid;',
        [newUser.username, newUser.password, newUser.firstname, newUser.lastname, newUser.email, "role"])
        // put that newly genertaed user_id on the DTO 
        newUser.userid = result.rows[0].user_id
        return userDTOToUserConverter(newUser)// convert and send back
    } catch(e){

        throw new InternalServerError()
    } finally {
        client && client.release()
    }
}
