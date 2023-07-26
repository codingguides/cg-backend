"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
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
    type: {
        type: String,
        enum: ["admin", "authorized", "others"],
    },
    isdelete: {
        type: Boolean
    },
    lastlogindate: {
        type: String
    },
}, { timestamps: true });
exports.UserModel = (0, mongoose_1.model)("users", UserSchema);
//# sourceMappingURL=user.js.map