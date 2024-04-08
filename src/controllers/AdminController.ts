import { Request , Response , NextFunction } from "express";
import { createVandorInput } from "../dto";
import { Vandor } from "../models";
import { generatePassword, generateSalt } from "../utility/PasswordUtility";

export const findVandor = async (id:string | undefined , email?: string) => {
 if(email) {
  return Vandor.findOne({email:email})
 } 
 return Vandor.findById(id)
}

export const createVandor = async (req: Request , res:Response , next:NextFunction) => {
  try {
    const { name , 
        ownerName , 
        foodType , 
        pinCode , 
        address , 
        email , 
        password , 
        phoneNumber , } = <createVandorInput>req.body

        const existingVandor = await findVandor('' , email)
        if(existingVandor !== null) {
          return  res.status(403).json("Vandor Already Exist with this email-AD")
        }
           
        const salt = await generateSalt()
        const userPassword = await generatePassword(password , salt)
        const createdVandor = await Vandor.create({
        name:name , 
        ownerName:ownerName , 
        foodType:foodType ,
        pinCode:pinCode ,
        address:address , 
        password:userPassword , 
        phoneNumber:phoneNumber , 
        email:email ,
        salt:salt , 
        serviceAvailable:false , 
        rating:0 ,
        coverImage:[],
        food:[]

        });

      return  res.status(200).json({message:"Vendor created Successfuly" , createVandor:createdVandor})
  } catch (error) {
   return res.status(500).json({message:"Internal Server" , error:error})
  }
    
}



export const getVandors = async (req: Request , res:Response , next:NextFunction) => {
    const vandors = await Vandor.find()
    if(vandors !== null) {
      return res.status(200).json({message:"Find vendors successfuly" , vandors:vandors})
    }
    return res.json({message:"Not found any vandor"})
}


export const getVandorById = async (req: Request , res:Response , next:NextFunction) => {
    const {id} = req.params;
    const vandor = await findVandor(id);
    if(vandor !== null) {
      return res.json(vandor)
    } 
    return res.json({message:"Not Found this vandor"})
}