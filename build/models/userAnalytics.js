"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAnalyticsModel = void 0;
const mongoose_1 = require("mongoose");
const UserAnalyticsSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Users'
    },
    topic_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Topics'
    },
    topic_url: {
        type: String,
    },
    attendedQuestionCount: {
        type: String,
    },
    rightAnswerCount: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Pass", "Fail", "not completed"],
    },
    point: {
        type: Number
    }
}, { timestamps: true });
exports.UserAnalyticsModel = (0, mongoose_1.model)("userAnalytics", UserAnalyticsSchema);
//# sourceMappingURL=userAnalytics.js.map