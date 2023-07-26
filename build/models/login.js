"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const LoginSchema = new mongoose_1.Schema({
    name: {
        type: String,
        uppercase: true,
    },
    email: {
        type: String
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
    },
    isdelete: {
        type: Boolean
    },
    lastlogindate: {
        type: String
    }
}, { timestamps: true });
exports.UserModel = mongoose_1.model("users", LoginSchema);
//# sourceMappingURL=login.js.map