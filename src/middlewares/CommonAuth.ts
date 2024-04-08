import { Request , Response , NextFunction } from "express";
import { authPayload } from "../dto";
import { validateSignature } from "../utility/PasswordUtility";

declare global {
    namespace Express {
        interface Request {
         user?: authPayload
        }  
    }
}

export const Authentication = async (req:Request , res:Response , next:NextFunction) => {
    const validate = await validateSignature(req)
    if(validate) {
       return next()
    } 
    return res.json({message:"User Not Authorized"})
}