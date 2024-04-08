import mongoose , {Schema  , Document , Model} from "mongoose";

interface customerDoc extends Document {
    firstName:string;
    lastName:string;
    verify:boolean;
    // otp:number;
    // otpExpiary:Date;
    lat:number;
    lng:number;
    address: string;
    password: string;
    phone: string;
    email: string;
    salt:string;
}


const customerSchema = new Schema({
    firstName:{type:String , required:true} , 
    lastName:{type:String , required:true} , 
    verify:{type:Boolean , required:true} ,
    // otp:{type:Number , required:true} ,
    // otpExpiary:{type:Date, required:true} ,
    lat:{type:Number} ,
    lng:{type:Number},
    address: {type:String , required:true} ,
    password: {type:String , required:true} ,
    phone: {type:Number , required:true} ,
    email: {type:String , required:true} ,
    salt:{type:String , required:true}
} , {
  toJSON:{
    transform(doc , ret) {
      delete ret.password 
      delete ret.salt
      delete ret.createdAt 
      delete ret.__v
      delete ret.updatedAt
    }
  } , 
  timestamps:true  
})

const Customer = mongoose.model<customerDoc>('customer' , customerSchema);

export {Customer}