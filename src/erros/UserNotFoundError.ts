import { HttpError } from "./HttpErros";

export class UserNotFoundError extends HttpError {
    constructor(){
        super('User Not Found', 404)
    }
}