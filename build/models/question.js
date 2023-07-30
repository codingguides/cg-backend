"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionModel = void 0;
const mongoose_1 = require("mongoose");
const QuestionSchema = new mongoose_1.Schema({
    question: {
        type: String,
    },
    options: [],
    rightoption: {
        type: String
    },
    point: {
        type: String
    },
    level: {
        type: String,
        enum: ["advance", "intermediate", "beginners"],
    },
    questiontype: {
        type: String,
        enum: ["fillintheblanks", "checkbox", "radiobutton", "text"],
    },
    topic_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Topics'
    },
}, { timestamps: true });
exports.QuestionModel = (0, mongoose_1.model)("questions", QuestionSchema);
//# sourceMappingURL=question.js.map