export class ReimbursementType{

    typeId: number;
    type: string 

    constructor(
        typeId: number,
        type: string){
            this.typeId = typeId;
            this.type = type
        }

}

// The ReimbursementType model is used to track what kind of reimbursement is being submitted. Type possibilities are