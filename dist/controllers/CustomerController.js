"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfileCustomer = exports.viewProfileCustomer = exports.loginCustomer = exports.signupCustomer = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Customer_dto_1 = require("../dto/Customer.dto");
const PasswordUtility_1 = require("../utility/PasswordUtility");
// import {generateOtp , onOtpRequest} from '../utility/NotificationUtility'
const CustomerModel_1 = require("../models/CustomerModel");
const signupCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customerInput = (0, class_transformer_1.plainToClass)(Customer_dto_1.customerSignupInput, req.body);
        const inputError = yield (0, class_validator_1.validate)(customerInput, { validationError: { target: true } });
        if (inputError.length > 0) {
            return res.status(400).json({ message: "Failed to Signup Customer", inputError: inputError });
        }
        const { email, phone, password } = customerInput;
        const existingUser = yield CustomerModel_1.Customer.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const salt = yield (0, PasswordUtility_1.generateSalt)();
        const userPassword = yield (0, PasswordUtility_1.generatePassword)(password, salt);
        // const {otp , otpExpiary} = await generateOtp()
        const result = yield CustomerModel_1.Customer.create({
            email: email,
            phone: phone,
            password: userPassword,
            salt: salt,
            firstName: 'ali',
            lastName: 'ali',
            // otp:otp , 
            // otpExpiary:otpExpiary , 
            verify: false,
            address: 'khiabon',
            lng: 0,
            lat: 0
        });
        if (result) {
            //  await onOtpRequest(otp , phone)
            const signature = yield (0, PasswordUtility_1.generateSignature)({
                _id: result._id,
                verify: result.verify,
                email: result.email,
            });
            return res.status(200).json({ message: "User Signup Successfully", signature: signature });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error });
    }
});
exports.signupCustomer = signupCustomer;
const loginCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customerInput = (0, class_transformer_1.plainToClass)(Customer_dto_1.customerLoginInput, req.body);
    const loginError = yield (0, class_validator_1.validate)(customerInput, { validationError: { target: true } });
    if (loginError.length > 0) {
        return res.status(400).json({ error: loginError });
    }
    const { email, password } = customerInput;
    const customer = yield CustomerModel_1.Customer.findOne({ email: email });
    if (customer) {
        const PasswordValidation = yield (0, PasswordUtility_1.validatePassword)(password, customer.password, customer.salt);
        if (!PasswordValidation) {
            return res.status(400).json({ message: "Failed to validation Password" });
        }
        const signature = yield (0, PasswordUtility_1.generateSignature)({
            _id: customer._id,
            email: customer.email,
            verify: customer.verify
        });
        return res.status(200).json({ message: "Welcome to your Panel", verify: customer.verify, signature: signature, email: customer.email });
    }
});
exports.loginCustomer = loginCustomer;
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
const viewProfileCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    if (customer) {
        const profile = yield CustomerModel_1.Customer.findById(customer._id);
        if (profile) {
            return res.status(200).json({ message: "Your profile loaded successfuly", profile: profile });
        }
        return res.status(400).json({ message: "Failed to find Customer", customer: profile });
    }
});
exports.viewProfileCustomer = viewProfileCustomer;
const editProfileCustomer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.user;
    const profileInput = (0, class_transformer_1.plainToClass)(Customer_dto_1.editCustomerInput, req.body);
    const profileError = yield (0, class_validator_1.validate)(profileInput, { validationError: { target: true } });
    if (profileError.length > 0) {
        return res.status(400).json(profileError);
    }
    const { firstName, lastName, address } = profileInput;
    if (customer) {
        const profile = yield CustomerModel_1.Customer.findById(customer._id);
        if (profile) {
            profile.firstName = firstName,
                profile.lastName = lastName,
                profile.address = address;
            yield profile.save();
            return res.status(200).json({ message: "profile Updated Successfuly", profile: profile });
        }
        return res.status(400).json({ message: "Not Found profile" });
    }
    return res.status(400).json({ message: "Customer is not Available" });
});
exports.editProfileCustomer = editProfileCustomer;
//# sourceMappingURL=CustomerController.js.map