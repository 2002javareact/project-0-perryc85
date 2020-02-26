import { PoolClient } from "pg";
import { connectionPool } from ".";
import { Reimbursement } from "../models/Reimbursement";
import { InternalServerError } from "../erros/InternalServerError";
import { reimbursementDTOToReimbursementConverter } from "../util/reimbursement-dto-to-reimbursement-converter";

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