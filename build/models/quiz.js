"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizModel = void 0;
const mongoose_1 = require("mongoose");
const QuizSchema = new mongoose_1.Schema({
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
    type: {
        type: String,
        enum: ["Advance", "Intermediate"],
    },
    questiontype: {
        type: String,
        enum: ["Fill-in-the-blanks", "Checkbox", "Radio-button"],
    },
    topic_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Topics'
    },
}, { timestamps: true });
exports.QuizModel = (0, mongoose_1.model)("quiz", QuizSchema);
//# sourceMappingURL=quiz.js.map