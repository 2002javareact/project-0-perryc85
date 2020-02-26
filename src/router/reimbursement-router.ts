import * as express from 'express'
import { authFactory } from '../middleware/auth-middleware';
import { Reimbursement } from '../models/Reimbursement';
import { findAllReimbursements } from '../services/reimbursement-service';

export const reimbursementRouter = express.Router()

// grabbing all the user data from the db
reimbursementRouter.get('/', [authFactory(['Admin', 'Finance_Manager']), async (req, res) =>{
    let reimbursement:Reimbursement[] = await findAllReimbursements();
    res.json(reimbursement)
}])