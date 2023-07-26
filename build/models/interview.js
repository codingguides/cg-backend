"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewModel = void 0;
const mongoose_1 = require("mongoose");
const InterviewSchema = new mongoose_1.Schema({
    question: {
        type: String,
    },
    answer: {
        type: String
    },
    type: {
        type: String,
        enum: ["beginner", "intermediate", "advance"],
    },
    topic_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Topics'
    }
}, { timestamps: true });
exports.InterviewModel = (0, mongoose_1.model)("interview", InterviewSchema);
//# sourceMappingURL=interview.js.map