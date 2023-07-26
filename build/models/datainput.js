"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatainputModel = void 0;
const mongoose_1 = require("mongoose");
const DatainputSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    year: {
        type: String,
    },
    month: {
        type: String,
    },
    totalnumberofworkingdays: {
        type: String,
        default: 0
    },
    monthlylaboursalestarget: {
        type: String,
        default: 0
    },
    monthlyhourssoldtarget: {
        type: String,
        default: 0
    }
}, { timestamps: true });
exports.DatainputModel = mongoose_1.model("datainput", DatainputSchema);
//# sourceMappingURL=datainput.js.map