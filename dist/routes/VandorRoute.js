"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VandorRoute = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
exports.VandorRoute = router;
router.post('/login', controllers_1.vandorLogin);
router.get('/profile', middlewares_1.Authentication, controllers_1.getVandorProfile);
router.patch('/profile', middlewares_1.Authentication, controllers_1.updateVandorProfile);
router.patch('/service', middlewares_1.Authentication, controllers_1.updateVandorService);
router.patch('/coverimage', middlewares_1.Authentication, controllers_1.upadteCoverImage);
router.post('/food', middlewares_1.Authentication, controllers_1.addFood);
router.get('/food', middlewares_1.Authentication, controllers_1.getFood);
//# sourceMappingURL=VandorRoute.js.map