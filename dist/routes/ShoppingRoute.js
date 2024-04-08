"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingRoute = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.ShoppingRoute = router;
router.get('/:pincode', controllers_1.foodAvailable);
router.get('/top-restaurant', controllers_1.getTopRestaurant);
router.get('/food-30-min/:pincode', controllers_1.food30Min);
router.get('/search/:picode', controllers_1.searchFood);
router.get('/findrest/:id', controllers_1.findRestaurantById);
//# sourceMappingURL=ShoppingRoute.js.map