import * as express from 'express'
import { authFactory, authCheckId } from '../middleware/auth-middleware';
import { Reimbursement } from '../models/Reimbursement';
import { findAllReimbursements, findReimbursementByStatus, findReimbursementByUser } from '../services/reimbursement-service';

export const reimbursementRouter = express.Router()

// grabbing all the user data from the db
reimbursementRouter.get('/', [authFactory(['Admin', 'Finance_Manager']), async (req, res) =>{
    let reimbursement:Reimbursement[] = await findAllReimbursements();
    res.json(reimbursement)
}])

reimbursementRouter.get('/status/:id', authFactory(['Admin', 'Finance_Manager']), authCheckId, async (req,res)=>{
    const id = +req.params.id
    if(isNaN(id)){
        res.sendStatus(400)
    }else {
        try{
            let user = await findReimbursementByStatus(id)
            res.json(user)
        }catch(e){
            res.status(e.status).send(e.message)
        }
    
    }
})

reimbursementRouter.get('/author/userId/:userId', authFactory(['Admin', 'Finance_Manager']), async (req, res) => {

    const id = +req.params.id
    if(isNaN(id)){
        res.sendStatus(400)
    }else {
        try{
            let user = await findReimbursementByUser(id)
            res.json(user)
        }catch(e){
            res.status(e.status).send(e.message)
        }
    
    }

})