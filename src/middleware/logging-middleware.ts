import { Request, Response, NextFunction } from "express";

export function loggingMiddleware(req:Request, res:Response, next:NextFunction){
    console.log(`Request Url is ${req.url} and Request Method is ${req.method} `)
    next()
}