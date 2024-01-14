"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizAnalyticsModel = void 0;
const mongoose_1 = require("mongoose");
const quizAnalyticsSchema = new mongoose_1.Schema({
    topic_id: {
        type: String,
        ref: 'Topics'
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Users'
    },
    rating: {
        type: String
    },
    status: {
        type: String,
        enum: ["completed", "not-completed"],
    }
}, { timestamps: true });
exports.QuizAnalyticsModel = (0, mongoose_1.model)("quizAnalytics", quizAnalyticsSchema);
//# sourceMappingURL=quizAnalytics.js.map