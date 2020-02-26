import { daoFindAllUsers, daoFindUserByUsernameAndPassword, daoFindUserById, daoUpdateOneUser } from '../repositories/user-dao';
import { User } from '../models/User';
import { UserDTO } from '../dtos/UserDTO';
 
// dao Find All Users
 export async function findAllUsers():Promise<User[]>{
    return await daoFindAllUsers()
 }

 // dao Find user by username and password
 export async function findUserByUsernameAndPassword(username:string, password:string): Promise<User>{
   return await daoFindUserByUsernameAndPassword(username,password)
}

// dao finding user by id
export async function findUserById(id:number):Promise<User>{
   return await daoFindUserById(id)
}

export async function updateOneUser(newUser:UserDTO):Promise<User>{
   return await daoUpdateOneUser(newUser)
}