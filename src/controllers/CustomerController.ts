import { Request , Response , NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { customerLoginInput, customerSignupInput, editCustomerInput } from "../dto/Customer.dto";
import { generatePassword, generateSalt, generateSignature, validatePassword } from "../utility/PasswordUtility";
// import {generateOtp , onOtpRequest} from '../utility/NotificationUtility'
import { Customer } from "../models/CustomerModel";


export const signupCustomer = async (req:Request , res:Response , next:NextFunction) => {
    try {
      const customerInput = plainToClass(customerSignupInput , req.body);
      const inputError = await validate(customerInput , {validationError: {target:true}});
  
      if(inputError.length > 0) {
         return res.status(400).json({message:"Failed to Signup Customer" , inputError:inputError})
      }
        const {email , phone , password} = customerInput
        const existingUser = await Customer.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const salt = await generateSalt();
        const userPassword = await generatePassword(password , salt);
        // const {otp , otpExpiary} = await generateOtp()
   
  
        const result = await Customer.create({
          email:email ,
          phone:phone , 
          password:userPassword , 
          salt:salt , 
          firstName:'ali' , 
          lastName:'ali' , 
          // otp:otp , 
          // otpExpiary:otpExpiary , 
          verify:false ,
          address:'khiabon' , 
          lng:0 , 
          lat:0
        })

       
  
      if(result) {
      //  await onOtpRequest(otp , phone)
     
       
       const signature = await generateSignature({
        _id:result._id , 
        verify:result.verify, 
         email:result.email , 
         
       })
      return res.status(200).json({message:"User Signup Successfully" , signature:signature})
      }
     } catch (error) {
      return res.status(500).json({message:"Internal Server Error" , error:error})
    }
   
}


export const loginCustomer = async (req:Request , res:Response , next:NextFunction) => {
   const customerInput = plainToClass(customerLoginInput , req.body);
   const loginError = await validate(customerInput , {validationError:{target:true}})
   if(loginError.length > 0) {
    return res.status(400).json({error:loginError})
   }
   const {email , password} = customerInput;
   const customer = await Customer.findOne({email:email})
   if(customer) {
    const PasswordValidation = await validatePassword(password , customer.password , customer.salt)
    if( !PasswordValidation) {
        return res.status(400).json({message:"Failed to validation Password"})
    }
   
    const signature = await generateSignature({
        _id:customer._id , 
        email:customer.email , 
        verify:customer.verify
    })
    return res.status(200).json({message:"Welcome to your Panel" , verify:customer.verify , signature:signature ,email:customer.email })
}

}


// export const verifyCustomer = async (req:Request , res:Response , next:NextFunction) => {
// // const {otp} = req.body;
// const customer = req.user
// if(customer) {
//     const user = await Customer.findById(customer._id);
//     if(user) {
//         if(user.otp === parseInt(otp) && user.otpExpiary <= new Date()){
//          user.verify = true;
//          const updateUserProfile = await user.save();
//          const signature = await generateSignature({
//             email:updateUserProfile.email , 
//             _id:updateUserProfile._id , 
//             verify:updateUserProfile.verify
//          })
//          return res.status(200).json({message:"User verified Successfuly" , signature:signature , user:updateUserProfile.verify})
//         }
//         return res.status(400).json({message:"Failed to verify User"})
// }
// return res.status(400).json({message:"Failed to find User"})
// }
// return res.status(500).json({message:"Internal Server"})
// }

// export const otpRequest= async (req:Request , res:Response , next:NextFunction) => {
// const customer = req.user;
// if(customer) {
//  const profile = await Customer.findById(customer._id);
//  if(profile) {
//    const {otp , otpExpiary} = await generateOtp();
//    profile.otp = otp;
//    profile.otpExpiary = otpExpiary;
//    await profile.save();
//   await onOtpRequest(otp , profile.phoneNumber)
//  return res.status(200).json({message:"your phone registred successfuly"})

//  }
//  return res.status(400).json({message:"Failed to find Customer"})
// }
// return res.status(400).json("failed to read req.user")
// }


export const viewProfileCustomer = async (req:Request , res:Response , next:NextFunction) => {
  const customer = req.user;
  if(customer) {
    const profile = await Customer.findById(customer._id);
    if(profile) {
       return res.status(200).json({message:"Your profile loaded successfuly" ,profile:profile })
    }
    return res.status(400).json({message:"Failed to find Customer" , customer:profile});
  }
  

}



export const editProfileCustomer = async (req:Request , res:Response , next:NextFunction) => {
const customer = req.user;
const profileInput = plainToClass(editCustomerInput , req.body);
const profileError = await validate(profileInput , {validationError:{target:true}});
if(profileError.length > 0) {
 return res.status(400).json(profileError)
}
const {firstName , lastName , address} = profileInput;
if(customer) {
  const profile = await Customer.findById(customer._id)
  if(profile) {
   profile.firstName = firstName , 
   profile.lastName = lastName ,
   profile.address = address 
   await profile.save();
   return res.status(200).json({message:"profile Updated Successfuly" , profile:profile})
  }
  return res.status(400).json({message:"Not Found profile"})
}
return res.status(400).json({message:"Customer is not Available"})
}