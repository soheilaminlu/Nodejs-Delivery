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
exports.findRestaurantById = exports.searchFood = exports.food30Min = exports.getTopRestaurant = exports.foodAvailable = void 0;
const models_1 = require("../models");
const foodAvailable = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { pincode } = req.params;
    const result = yield models_1.Vandor.find({ pinCode: pincode, serviceAvailable: true })
        .sort([['rating', 'descending']])
        .populate('food');
    if (result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(400).json({ message: "Not found Data" });
});
exports.foodAvailable = foodAvailable;
const getTopRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { pincode } = req.params;
    const result = yield models_1.Vandor.find({ pinCode: pincode, serviceAvailable: false })
        .sort([['rating', 'descending']])
        .limit(10);
    if (result.length > 0) {
        return res.status(200).json(result);
    }
    return res.status(400).json({ message: "Not found Data" });
});
exports.getTopRestaurant = getTopRestaurant;
const food30Min = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { pincode } = req.params;
    const result = yield models_1.Vandor.find({ pinCode: pincode, serviceAvailable: false })
        .populate('food');
    if (result.length > 0) {
        let foodResult = [];
        result.map(vandor => {
            const foods = vandor.food;
            foodResult.push(...foods.filter(food => food.readyTime <= 30));
        });
        return res.json(foodResult);
    }
    return res.status(400).json({ message: "Not found Data" });
});
exports.food30Min = food30Min;
const searchFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { pincode } = req.params;
    const result = yield models_1.Vandor.find({ pinCode: pincode, serviceAvailable: false })
        .populate('food');
    if (result.length > 0) {
        let foodResult = [];
        result.map(item => foodResult.push(...item.food));
    }
    return res.status(400).json({ message: "Not found Data" });
});
exports.searchFood = searchFood;
const findRestaurantById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const restaurant = yield models_1.Vandor.findById(id).populate('food');
    if (restaurant) {
        return res.json({ res: restaurant, resFood: restaurant.food });
    }
});
exports.findRestaurantById = findRestaurantById;
//# sourceMappingURL=ShoppingController.js.map