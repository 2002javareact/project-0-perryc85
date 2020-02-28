import { Reimbursement } from "../models/Reimbursement";
import { daoFindAllReimbursements, daoFindReimbursementByStatus, daoFindReimbursementByUser, daoCreateReimbursement } from "../repositories/reimbursement-dao";
import { ReimbursementDTO } from "../dtos/ReimbursementDTO";

// dao Find All Users
export async function findAllReimbursements():Promise<Reimbursement[]>{
    return await daoFindAllReimbursements()
 }

 export async function findReimbursementByStatus(id:number):Promise<Reimbursement[]>{
    return await daoFindReimbursementByStatus(id)
 }

 export async function findReimbursementByUser(id:number): Promise<Reimbursement[]>{
    return await daoFindReimbursementByUser(id)
 }

 export async function createReimbursement(newSubmission:ReimbursementDTO):Promise<Reimbursement[]>{
   return await daoCreateReimbursement(newSubmission)
 }