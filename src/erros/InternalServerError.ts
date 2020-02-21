import { HttpError } from "./HttpErros"

export class InternalServerError extends HttpError{
    constructor(){
        super('Internal Server Error', 500)
    }
}