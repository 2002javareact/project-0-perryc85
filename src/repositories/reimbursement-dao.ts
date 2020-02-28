import { PoolClient } from "pg";
import { connectionPool } from ".";
import { Reimbursement } from "../models/Reimbursement";
import { InternalServerError } from "../erros/InternalServerError";
import { reimbursementDTOToReimbursementConverter } from "../util/reimbursement-dto-to-reimbursement-converter";
import { UserNotFoundError } from "../erros/UserNotFoundError";
import { BadCredentialsError } from "../erros/BadCredentialsError";
import { ReimbursementDTO } from "../dtos/ReimbursementDTO";


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

export async function daoFindReimbursementByStatus(id:number):Promise<Reimbursement[]>{ 
    let client:PoolClient
    try{
        client = await connectionPool.connect()
        let result = await client.query('SELECT * FROM project_0.reimbursement WHERE status = $1 ORDER BY datesubmitted DESC', [id])

        if(result.rowCount === 0){
            throw new Error('User Not Found')
        }
        return result.rows.map(reimbursementDTOToReimbursementConverter)

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

export async function daoFindReimbursementByUser(id:number):Promise<Reimbursement[]>{
    let client:PoolClient
    try {
        client = await connectionPool.connect()
        // a paramaterized query
        let results = await client.query('SELECT * FROM project_0.reimbursement WHERE author = $1 ORDER BY datesubmitted DESC', [id])
        if(results.rowCount === 0){
            throw new Error('User Not Found')
        }
        return results.rows.map(reimbursementDTOToReimbursementConverter)
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

export async function daoCreateReimbursement(newSubmission:ReimbursementDTO):Promise<Reimbursement[]>{
    
    let client:PoolClient
    
    try {
        client = await connectionPool.connect()

        let reimbursement_id = (await client.query('SELECT * FROM project_0.reimbursement WHERE reimbursementid = $1', [newSubmission.reimbursementid])).rows[0].reimbursementid

        let results = await client.query('INSERT INTO project_0.reimbursement set author = $1, amount = $2,datesubmitted = $3, dateresolved = $4, description = $5, resolver = $6, status = $7, type = $8 RETURNING reimbursementid;', [newSubmission.author, newSubmission.amount, newSubmission.datesubmitted, newSubmission.dateresolved, newSubmission.description, newSubmission.resolver, newSubmission.status, newSubmission.type, reimbursement_id ])

        newSubmission.reimbursementid = results.rows[0].reimbursementid

        return results.rows.map(reimbursementDTOToReimbursementConverter)
    } catch (e) {
        throw new InternalServerError()
    }finally{
        client && client.release()
    }
}
