import mongoose  , {Schema , Document , Model} from 'mongoose';

export interface FoodDoc extends Document {
vandorId:string;
price:number;
name:string;
category:string;
image:[string];
readyTime:number;
rating:number;
foodType:string;
description:string;
}


const foodSchema =  new Schema({
    vandorId:{type:String , required:true} , 
    price:{type:Number , required:true}, 
    name:{type:String , required:true}, 
    category:{type:String , }, 
    image:{type:[String]}, 
    readyTime:{type:Number}, 
    rating:{type:Number}, 
    foodType:{type:String , required:true} , 
    description:{type:String}, 
} , {
     toJSON: {
        transform(doc , ret) {
            delete ret.createdAt 
            delete ret.__v
            delete ret.updatedAt
        }
     } ,
     timestamps:true
})


const Food = mongoose.model<FoodDoc>('food' , foodSchema);

export {Food}