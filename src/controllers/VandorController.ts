import { Request , Response  , NextFunction} from "express";
import { createFoodInput, editVandorInput, vandorLoginInput} from '../dto'
import { findVandor } from "./AdminController";
import { generateSignature, validatePassword } from "../utility/PasswordUtility";
import { Food } from "../models";


export const vandorLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = <vandorLoginInput>req.body;
    const existingVandor = await findVandor('', email);
    if (existingVandor !== null) {
     
      const validation = await validatePassword(password, existingVandor.password, existingVandor.salt);
      if (validation) {
  
        const signature = await generateSignature({
         _id: existingVandor.id , 
         email:existingVandor.email ,
         name:existingVandor.name
        });
       return res.json({exisitingVandor:existingVandor , signature:signature});
      }
    }
    return res.json({ message: "Password is Not Valid" });
  };
  


export const getVandorProfile = async (req:Request , res:Response , next:NextFunction) =>{
  const user = req.user 
  console.log(user)
  if(user) {
   const existingVandor = await findVandor(user._id);
   return  res.status(200).json(existingVandor);
  }
  return res.json({message:"User is not Valid"})
}

export const updateVandorProfile = async (req:Request , res:Response , next:NextFunction) =>{
    const {foodType , address , phoneNumber , name} = <editVandorInput>req.body;
    const user = req.user;
    console.log(user)
    if(user){

      const existingVendor = await findVandor(user._id);

      if(existingVendor !== null){

           existingVendor.name = name;
           existingVendor.address = address;
           existingVendor.phoneNumber = phoneNumber;
           existingVendor.foodType = foodType;
           const saveResult = await existingVendor.save();

           return res.status(200).json({message:"Vendor Updated Successfuly" , saveResult:saveResult});
      }

   }
   return res.json({message: 'Unable to Update vendor profile '})

}

export const updateVandorService = async (req:Request , res:Response , next:NextFunction) =>{
const user = req.user;
if(user) {
  const existingUser = await findVandor(user._id);
  if(existingUser !== null) {
    existingUser.serviceAvailable = !existingUser.serviceAvailable
    await existingUser.save();
    return res.json(existingUser)
  }
  return res.json({message:'Failed to Update Service'})
}
}

export const upadteCoverImage = async (req:Request , res:Response , next:NextFunction) => {

  const user = req.user;

  if(user) {
    const vandor = await findVandor(user._id)
    if(vandor !== null) {
      const files = req.files as Express.Multer.File[];
      const image = files.map((file: Express.Multer.File) => file.filename);
      vandor.coverImage.push(...image)
       const result = await vandor.save();
       return res.json(result)
      }
  }
}

export const addFood = async (req:Request , res:Response , next:NextFunction) =>{
  try {
    const user = req.user;
    console.log(user);
  const {name , price , category , foodType , description , readyTime} = <createFoodInput>req.body
  if(user) {
    const vandor = await findVandor(user._id)
    if(vandor !== null) {
      // const files = req.files as Express.Multer.File[];
      // const image = files.map((file: Express.Multer.File) => file.filename);
  
      const createFood = await Food.create({
        vandorId:vandor._id , 
        name:name , 
        price:price , 
        category:category , 
        foodType:foodType , 
        // image:image , 
        description:description , 
        readyTime:readyTime
  
      })
     vandor.food.push(createFood);
     await vandor.save();
    return res.json({message:"food created and added successfully" , createFood:createFood});
    }
    return res.json({message:"Failed to find vandor"});
  
  }
  return res.json({message:"User is not Valid"});
  } catch (error) {
   return res.status(500).json({message:"Failed to add food" , error:error});
  }

}


export const getFood = async (req:Request , res:Response , next:NextFunction) =>{

const user = req.user;
if(user) {
  const foods = await Food.find({vandorId:user._id})
  if(foods !== null) {
   return res.json({message:"Loading Foods Successfuly" , foods:foods})
  }
  return res.json({message:"Failed to find Foods"})
}
return res.json({message:"Failed to find User"})

}
