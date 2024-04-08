"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vandor = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const vandorSchema = new mongoose_1.Schema({
    ownerName: { type: String, required: true },
    name: { type: String, required: true },
    foodType: { type: [String], required: true },
    pinCode: { type: Number, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    email: { type: String },
    salt: { type: String, required: true },
    serviceAvailable: { type: Boolean, required: true },
    coverImage: { type: [String] },
    rating: { type: Number },
    food: [{ type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'food'
        }]
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.salt;
            delete ret.createdAt;
            delete ret.__v;
            delete ret.updatedAt;
        }
    },
    timestamps: true
});
const Vandor = mongoose_1.default.model('vandor', vandorSchema);
exports.Vandor = Vandor;
//# sourceMappingURL=VandorModel.js.map