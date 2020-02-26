import { Reimbursement } from "../models/Reimbursement";
import { daoFindAllReimbursements } from "../repositories/reimbursement-dao";

// dao Find All Users
export async function findAllReimbursements():Promise<Reimbursement[]>{
    return await daoFindAllReimbursements()
 }