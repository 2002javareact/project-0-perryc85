

export const authAdminMiddleware = (req,res,next)=>{
    if(!req.session.user){
        res.status(401).send('Please Login')
    }else if(req.session.user.role === 'Admin'){
        next()
    } else {
        res.status(403).send('You are UnAuthorized for this endpoint')
    }
    
} 


export const financeManagerMiddleware = (req,res,next)=>{

} 

export const userMiddleware = (req,res,next)=>{

} 