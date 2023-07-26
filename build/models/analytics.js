"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsModel = void 0;
const mongoose_1 = require("mongoose");
const AnalyticsSchema = new mongoose_1.Schema({
    videoId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "VideoModel"
    },
    clientId: {
        type: String,
    },
    video: {
        type: String,
    },
    template: {
        type: String,
    },
    eventCategory: {
        type: String,
    },
    eventAction: {
        type: String,
    },
    eventValue: {
        type: String,
        unique: true
    },
    ip: {
        type: String,
    },
    location: {
        type: String,
    },
    assetsId: {
        type: String,
    }
}, { timestamps: true });
exports.AnalyticsModel = mongoose_1.model("analytics", AnalyticsSchema);
//# sourceMappingURL=analytics.js.map