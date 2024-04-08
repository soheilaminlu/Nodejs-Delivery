"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerRoute = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.CustomerRoute = router;
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
router.post('/signup', controllers_1.signupCustomer);
router.post('/login', middlewares_1.Authentication, controllers_1.loginCustomer);
// router.patch('/verify' , verifyCustomer);
router.patch('/edit-profile', middlewares_1.Authentication, controllers_1.editProfileCustomer);
// router.patch('/otp' , otpRequest)
router.get('/view-profile', middlewares_1.Authentication, controllers_1.viewProfileCustomer);
//# sourceMappingURL=CustomerRoute.js.map