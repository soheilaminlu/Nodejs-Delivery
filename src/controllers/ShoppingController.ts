import {Request , Response , NextFunction} from 'express';
import { Vandor , FoodDoc } from '../models';
import { findVandor } from './AdminController';




export const foodAvailable = async (req:Request , res:Response , next:NextFunction) => {
    const {pincode} = req.params;
    const result = await Vandor.find({pinCode:pincode , serviceAvailable:true})
    .sort([['rating' , 'descending']])
    .populate('food')
    if(result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(400).json({message:"Not found Data"})
}

export const getTopRestaurant = async (req:Request , res:Response , next:NextFunction) => {
    const {pincode} = req.params;
    const result = await Vandor.find({pinCode:pincode , serviceAvailable:false})
    .sort([['rating' , 'descending']])
    .limit(10)
    if(result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(400).json({message:"Not found Data"})
}


export const food30Min = async (req:Request , res:Response , next:NextFunction) => {
    const {pincode} = req.params;
    const result = await Vandor.find({pinCode:pincode , serviceAvailable:false})
    .populate('food')
    if(result.length > 0) {
        let foodResult :any = []
        result.map(vandor => {
          const foods = vandor.food as [FoodDoc]
          foodResult.push(...foods.filter(food =>food.readyTime<=30))
          
        })
        return res.json(foodResult);
    }
    return res.status(400).json({message:"Not found Data"})
}



export const searchFood = async (req:Request , res:Response , next:NextFunction) => {
    const {pincode} = req.params;
    const result = await Vandor.find({pinCode:pincode , serviceAvailable:false})
    .populate('food')
    if(result.length > 0) {
        let foodResult :any = []
        result.map(item => foodResult.push(...item.food))
    }
    return res.status(400).json({message:"Not found Data"})
}

export const findRestaurantById = async (req:Request , res:Response , next:NextFunction) => {
    const {id} = req.params;
    const restaurant = await Vandor.findById(id).populate('food');
    if(restaurant) {
       return res.json({res:restaurant ,resFood:restaurant.food})
    }
    
}
