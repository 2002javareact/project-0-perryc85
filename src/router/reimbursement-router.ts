import * as express from 'express'
import { authFactory, authCheckId } from '../middleware/auth-middleware';
import { Reimbursement } from '../models/Reimbursement';
import { findAllReimbursements, findReimbursementByStatus, findReimbursementByUser, createReimbursement, updateReimbursement } from '../services/reimbursement-service';
import { ReimbursementDTO } from '../dtos/ReimbursementDTO';

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

reimbursementRouter.get('/author/userId/:id', authFactory(['Admin', 'Finance_Manager']), async (req, res) => {

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

reimbursementRouter.post('/', async (req, res) => {
 
    let{reimbursementid, author, amount, datesubmitted, dateresolved, description, resolver, status, type}:{
        reimbursementid:number,
        author: number,
        amount: number,
        datesubmitted: number,
        dateresolved: number,
        description: string,
        resolver: number,
        status: number,
        type: number
    } = req.body

    if(author && amount && datesubmitted && dateresolved && description && resolver && status && type){
        let newReimbursement = await createReimbursement(new ReimbursementDTO(
            0,
            author,
            amount,
            datesubmitted,
            dateresolved,
            description,
            resolver,
            status,
            type
        ))
        res.status(201).json(newReimbursement);
    }else{
        res.status(400).send('Please include all user fields')
    }

})


reimbursementRouter.patch('/', authFactory(['Admin', 'Finance_Manager']), async (req, res) => {
 
    let{reimbursementid, author, amount, datesubmitted, dateresolved, description, resolver, status, type}:{
        reimbursementid:number,
        author: number,
        amount: number,
        datesubmitted: number,
        dateresolved: number,
        description: string,
        resolver: number,
        status: number,
        type: number
    } = req.body

    let updatedReimbursement = await updateReimbursement(new ReimbursementDTO(
        reimbursementid,
        author,
        amount,
        datesubmitted,
        dateresolved,
        description,
        resolver,
        status,
        type
    ))

    res.json(updatedReimbursement);
})
