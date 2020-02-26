import { ReimbersementDTO } from "../dtos/ReimbursementDTO";
import { Reimbursement } from "../models/Reimbursement";


export function reimbursementDTOToReimbursementConverter(reimbersementDTO:ReimbersementDTO):Reimbursement{
    return new Reimbursement(
        reimbersementDTO.reimbersementid,
        reimbersementDTO.author,
        reimbersementDTO.amount,
        reimbersementDTO.datesubmitted,
        reimbersementDTO.dateresolved,
        reimbersementDTO.description,
        reimbersementDTO.resolver,
        reimbersementDTO.status,
        reimbersementDTO.type
    )
}

