"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BIModel = void 0;
const mongoose_1 = require("mongoose");
const BiSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    biTitle: {
        type: String,
    },
    // videoSlug: {
    //     type: String,
    // },
    // videoImage: {
    //     type: String
    // },
    // videoBeneathImage: {
    //     type: String
    // },
    // videoDescription: {
    //     type: String,
    // },
    // videoDate: {
    //     type: String,
    // },
    // videoTime: {
    //     type: String,
    // },
    // videoTimeStatus: { 
    //     type: String
    // },
    // videoType: {
    //     type: String 
    // },
    // videoStatus: { 
    //     type: String 
    // },
    // videoUrl: { 
    //     type: String 
    // },
    // video: { 
    //     type: String 
    // },
    // like: { 
    //     type: Number,
    //     default: 0
    // },
    // dislike: { 
    //     type: Number,
    //     default: 0
    // },
    // view: { 
    //     type: Number,
    //     default: 0
    // },
    isDefult: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
exports.BIModel = mongoose_1.model("bidata", BiSchema);
//# sourceMappingURL=bi.js.map