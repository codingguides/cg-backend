"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entitiesLogin = void 0;
const mongoose_1 = require("mongoose");
;
const loginSchema = new mongoose_1.Schema({
    phone: { type: String, required: true },
    password: { type: String, required: false }
});
const entitiesLogin = mongoose_1.model("users", loginSchema);
exports.entitiesLogin = entitiesLogin;
//# sourceMappingURL=login.js.map