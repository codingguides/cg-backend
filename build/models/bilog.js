"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiLogModel = void 0;
const mongoose_1 = require("mongoose");
const BiLogSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    uniqueId: {
        type: String,
    },
    count: {
        type: Number,
    },
    updatedDate: {
        type: Date,
        default: new Date()
    }
}, { timestamps: true });
exports.BiLogModel = (0, mongoose_1.model)("bilogs", BiLogSchema);
//# sourceMappingURL=bilog.js.map