import { PoolClient } from "pg";
import { connectionPool } from ".";
import { Reimbursement } from "../models/Reimbursement";
import { InternalServerError } from "../erros/InternalServerError";
import { reimbursementDTOToReimbursementConverter } from "../util/reimbursement-dto-to-reimbursement-converter";
import { UserNotFoundError } from "../erros/UserNotFoundError";
import { User } from "../models/User";
import { BadCredentialsError } from "../erros/BadCredentialsError";
import { ReimbursementDTO } from "../dtos/ReimbursementDTO";
import { findReimbursementByStatus } from "../services/reimbursement-service";

// this function gets anf formats all users
export async function daoFindAllReimbursements():Promise<Reimbursement[]>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let results = await client.query('SELECT * FROM project_0.reimbursement')
        return results.rows.map(reimbursementDTOToReimbursementConverter)
    }catch(e){
        throw new InternalServerError()
    } finally {
        client && client.release()
    }

}

export async function daoFindReimbursementByStatus(id:number):Promise<Reimbursement>{
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM project_0.reimbursement_status RS inner join project_0.reimbursement R on RS.statusid = $1 ORDER BY R.datesubmitted ASC', [id])

        if(result.rowCount === 0){
            throw new Error('User Not Found')
        }
        return reimbursementDTOToReimbursementConverter(result.rows[0])

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

export async function daoFindReimbursementByUser(id:number):Promise<Reimbursement>{
    let client:PoolClient// our potential connection to db
    try {
        client = await connectionPool.connect()
        // a paramaterized query
        let results = await client.query('SELECT * FROM project_0.reimbursement R inner join project_0."User" U on U.userid = U.userid  WHERE U.userid = $1', [id])
        if(results.rowCount === 0){
            throw new Error('User Not Found')
        }
        return reimbursementDTOToReimbursementConverter(results.rows[0])
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
