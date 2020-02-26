export class ReimbersementDTO{
    reimbersementid: number;
    author: number;
    amount: number;
    datesubmitted: number;
    dateresolved: number;
    description: string;
    resolver: number;
    status: number;
    type: number

    constructor(
        reimbersementid: number,
        author: number,
        amount: number,
        datesubmitted: number,
        dateresolved: number,
        resolver: number,
        status: number,
        type: number){
            this.reimbersementid = reimbersementid;
            this.author = author;
            this.amount = amount;
            this.datesubmitted = datesubmitted;
            this.dateresolved = dateresolved;
            this.resolver = resolver;
            this.status = status;
            this.type = type
    }
}