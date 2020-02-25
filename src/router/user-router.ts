import * as express from 'express'
import { authFactory, authCheckId } from '../middleware/auth-middleware';
import { User } from '../models/User';
import { findAllUsers, findUserById } from '../services/user-service';

export const userRouter = express.Router()

// grabbing all the user data from the db
userRouter.get('/', [authFactory(['Admin', 'Finance_Manager']), async (req, res) =>{
    let user:User[] = await findAllUsers();
    res.json(user)
}])

userRouter.get('/:id', authFactory(['Admin', 'Finance_Manager']), authCheckId, async (req,res)=>{
    const id = +req.params.id
    if(isNaN(id)){
        res.sendStatus(400)
    }else {
        try{
            let user = await findUserById(id)
            res.json(user)
        }catch(e){
            res.status(e.status).send(e.message)
        }
      
        
    }
})