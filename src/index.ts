import * as express from 'express'
import * as bodyparser from 'body-parser'
import { userRouter } from './router/user-router'
import { sessionMiddleware } from './middleware/session-middleware'


const app = express()

// this my first piece of middleware, body parser
app.use('/', bodyparser.json())


app.use(sessionMiddleware)


// this will register all http requests that match /users
// and redirect them to the userRouter
app.use('/users', userRouter)


app.listen(2020, ()=>{
    console.log('app has started on port 2020');
})