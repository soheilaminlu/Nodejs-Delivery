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
exports.getFood = exports.addFood = exports.upadteCoverImage = exports.updateVandorService = exports.updateVandorProfile = exports.getVandorProfile = exports.vandorLogin = void 0;
const AdminController_1 = require("./AdminController");
const PasswordUtility_1 = require("../utility/PasswordUtility");
const models_1 = require("../models");
const vandorLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingVandor = yield (0, AdminController_1.findVandor)('', email);
    if (existingVandor !== null) {
        const validation = yield (0, PasswordUtility_1.validatePassword)(password, existingVandor.password, existingVandor.salt);
        if (validation) {
            const signature = yield (0, PasswordUtility_1.generateSignature)({
                _id: existingVandor.id,
                email: existingVandor.email,
                name: existingVandor.name
            });
            return res.json({ exisitingVandor: existingVandor, signature: signature });
        }
    }
    return res.json({ message: "Password is Not Valid" });
});
exports.vandorLogin = vandorLogin;
const getVandorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    console.log(user);
    if (user) {
        const existingVandor = yield (0, AdminController_1.findVandor)(user._id);
        return res.status(200).json(existingVandor);
    }
    return res.json({ message: "User is not Valid" });
});
exports.getVandorProfile = getVandorProfile;
const updateVandorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { foodType, address, phoneNumber, name } = req.body;
    const user = req.user;
    console.log(user);
    if (user) {
        const existingVendor = yield (0, AdminController_1.findVandor)(user._id);
        if (existingVendor !== null) {
            existingVendor.name = name;
            existingVendor.address = address;
            existingVendor.phoneNumber = phoneNumber;
            existingVendor.foodType = foodType;
            const saveResult = yield existingVendor.save();
            return res.status(200).json({ message: "Vendor Updated Successfuly", saveResult: saveResult });
        }
    }
    return res.json({ message: 'Unable to Update vendor profile ' });
});
exports.updateVandorProfile = updateVandorProfile;
const updateVandorService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const existingUser = yield (0, AdminController_1.findVandor)(user._id);
        if (existingUser !== null) {
            existingUser.serviceAvailable = !existingUser.serviceAvailable;
            yield existingUser.save();
            return res.json(existingUser);
        }
        return res.json({ message: 'Failed to Update Service' });
    }
});
exports.updateVandorService = updateVandorService;
const upadteCoverImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const vandor = yield (0, AdminController_1.findVandor)(user._id);
        if (vandor !== null) {
            const files = req.files;
            const image = files.map((file) => file.filename);
            vandor.coverImage.push(...image);
            const result = yield vandor.save();
            return res.json(result);
        }
    }
});
exports.upadteCoverImage = upadteCoverImage;
const addFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        console.log(user);
        const { name, price, category, foodType, description, readyTime } = req.body;
        if (user) {
            const vandor = yield (0, AdminController_1.findVandor)(user._id);
            if (vandor !== null) {
                // const files = req.files as Express.Multer.File[];
                // const image = files.map((file: Express.Multer.File) => file.filename);
                const createFood = yield models_1.Food.create({
                    vandorId: vandor._id,
                    name: name,
                    price: price,
                    category: category,
                    foodType: foodType,
                    // image:image , 
                    description: description,
                    readyTime: readyTime
                });
                vandor.food.push(createFood);
                yield vandor.save();
                return res.json({ message: "food created and added successfully", createFood: createFood });
            }
            return res.json({ message: "Failed to find vandor" });
        }
        return res.json({ message: "User is not Valid" });
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to add food", error: error });
    }
});
exports.addFood = addFood;
const getFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (user) {
        const foods = yield models_1.Food.find({ vandorId: user._id });
        if (foods !== null) {
            return res.json({ message: "Loading Foods Successfuly", foods: foods });
        }
        return res.json({ message: "Failed to find Foods" });
    }
    return res.json({ message: "Failed to find User" });
});
exports.getFood = getFood;
//# sourceMappingURL=VandorController.js.map