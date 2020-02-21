import { HttpError } from "./HttpErros";

export class BadCredentialsError extends HttpError{
    constructor(){
        super('Invalid Credentials', 400)
    }
}