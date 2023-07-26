"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsModel = void 0;
const mongoose_1 = require("mongoose");
const AssetsSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    advertisementPlace: {
        type: String
    },
    content: {
        type: String
    },
    contenttype: {
        type: String
    },
    redirecturl: {
        type: String
    },
    s_hours: {
        type: Number,
    },
    e_hours: {
        type: Number,
    },
    template: {
        type: Number
    },
    subtemplate: {
        type: String
    },
    assetsName: {
        type: String
    },
    advertisementTitle: {
        type: String
    },
    advertisementLongTitle: {
        type: String
    },
    advertisementSubTitle: {
        type: String
    },
    advertisementPrice: {
        type: String
    },
    advertisementImageGallery: {
        type: String
    },
    advertisementDescription: {
        type: String
    },
    buttonText: {
        type: String
    },
    nextscreenheaderText: {
        type: String
    },
    nextscreenbodyText: {
        type: String
    },
    nextscreenbuttonText: {
        type: String
    },
    nextScreenLogo: {
        type: String
    },
    instock: {
        type: String
    },
    tab: {
        type: String
    },
    addressline1: {
        type: String
    },
    addressline2: {
        type: String
    },
    position: {
        type: String,
        default: 'Vertical'
    },
    subtitlebold: {
        type: Boolean,
        default: false
    },
}, { timestamps: true, strict: false });
exports.AssetsModel = mongoose_1.model("assets", AssetsSchema);
//# sourceMappingURL=assets.js.map