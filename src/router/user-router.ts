import * as express from 'express';

export const userRouter = express.Router()

// grabbing all the user data from the db
userRouter.get('', (req,res)=>{
    res.json([])
})