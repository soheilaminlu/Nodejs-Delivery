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
exports.getVandorById = exports.getVandors = exports.createVandor = exports.findVandor = void 0;
const models_1 = require("../models");
const PasswordUtility_1 = require("../utility/PasswordUtility");
const findVandor = (id, email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        return models_1.Vandor.findOne({ email: email });
    }
    return models_1.Vandor.findById(id);
});
exports.findVandor = findVandor;
const createVandor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, ownerName, foodType, pinCode, address, email, password, phoneNumber, } = req.body;
        const existingVandor = yield (0, exports.findVandor)('', email);
        if (existingVandor !== null) {
            return res.status(403).json("Vandor Already Exist with this email-AD");
        }
        const salt = yield (0, PasswordUtility_1.generateSalt)();
        const userPassword = yield (0, PasswordUtility_1.generatePassword)(password, salt);
        const createdVandor = yield models_1.Vandor.create({
            name: name,
            ownerName: ownerName,
            foodType: foodType,
            pinCode: pinCode,
            address: address,
            password: userPassword,
            phoneNumber: phoneNumber,
            email: email,
            salt: salt,
            serviceAvailable: false,
            rating: 0,
            coverImage: [],
            food: []
        });
        return res.status(200).json({ message: "Vendor created Successfuly", createVandor: createdVandor });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server", error: error });
    }
});
exports.createVandor = createVandor;
const getVandors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const vandors = yield models_1.Vandor.find();
    if (vandors !== null) {
        return res.status(200).json({ message: "Find vendors successfuly", vandors: vandors });
    }
    return res.json({ message: "Not found any vandor" });
});
exports.getVandors = getVandors;
const getVandorById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const vandor = yield (0, exports.findVandor)(id);
    if (vandor !== null) {
        return res.json(vandor);
    }
    return res.json({ message: "Not Found this vandor" });
});
exports.getVandorById = getVandorById;
//# sourceMappingURL=AdminController.js.map