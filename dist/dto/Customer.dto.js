"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCustomerInput = exports.customerLoginInput = exports.customerSignupInput = void 0;
const class_validator_1 = require("class-validator");
class customerSignupInput {
}
exports.customerSignupInput = customerSignupInput;
__decorate([
    (0, class_validator_1.IsEmail)()
], customerSignupInput.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Length)(7, 14)
], customerSignupInput.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.Length)(7, 14)
], customerSignupInput.prototype, "phone", void 0);
class customerLoginInput {
}
exports.customerLoginInput = customerLoginInput;
__decorate([
    (0, class_validator_1.IsEmail)()
], customerLoginInput.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Length)(7, 14)
], customerLoginInput.prototype, "password", void 0);
class editCustomerInput {
}
exports.editCustomerInput = editCustomerInput;
__decorate([
    (0, class_validator_1.Length)(6, 16)
], editCustomerInput.prototype, "address", void 0);
//# sourceMappingURL=Customer.dto.js.map