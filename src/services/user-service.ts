import { daoFindAllUsers, daoFindUserByUsernameAndPassword, daoFindUserById } from '../repositories/user-dao';
import { User } from '../models/User';
 
//  daoFindAllUsers
 export async function findAllUsers():Promise<User[]>{
    return await daoFindAllUsers()
 }

 export async function findUserByUsernameAndPassword(username:string, password:string): Promise<User>{
   return await daoFindUserByUsernameAndPassword(username,password)
}

export async function findUserById(id:number):Promise<User>{
   return await daoFindUserById(id)
}