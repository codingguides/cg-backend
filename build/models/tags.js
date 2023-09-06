"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsModel = void 0;
const mongoose_1 = require("mongoose");
const TagsSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
        enum: ["topic", "questions", "blog"],
    },
    topic_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Topics'
    },
    question_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Questions'
    },
    blog_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Blogs'
    }
}, { timestamps: true });
exports.TagsModel = (0, mongoose_1.model)("tags", TagsSchema);
//# sourceMappingURL=tags.js.map