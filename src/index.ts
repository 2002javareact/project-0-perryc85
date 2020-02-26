import * as express from 'express'
import * as bodyparser from 'body-parser'
import { userRouter } from './router/user-router'
import { sessionMiddleware } from './middleware/session-middleware'
import { loggingMiddleware } from './middleware/logging-middleware'
import { findUserByUsernameAndPassword } from './services/user-service';
import { reimbursementRouter } from './router/reimbursement-router'


const app = express()

app.use('/', bodyparser.json())

app.use(loggingMiddleware)
app.use(sessionMiddleware)

app.use('/user', userRouter)
app.use('/reimbursement', reimbursementRouter)

app.post('/login', async (req,res)=>{
    
    const {username, password} = req.body
    
    if(!username || !password){
        res.status(400).send('Invalid Credentials')
    } else {
        try {
            let user = await findUserByUsernameAndPassword(username,password)
            req.session.user = user
            res.status(200).json(user)
        } catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

app.use('/', (req, res) => {
    res.send('<h1><center>Hello Batch!</center></h1><h3><center>Thanks for tuning in<br>to my Project Zero\'s API!</center></h3>')
})

app.listen(2021, ()=>{
    console.log('app has started on port 2021');
})