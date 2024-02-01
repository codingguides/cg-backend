"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = void 0;
const mongoose_1 = require("mongoose");
const BlogSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    slug: {
        type: String
    },
    sort_title: {
        type: String,
    },
    sort_slug: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["publish", "draft"],
    },
    question_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Questions'
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Users'
    },
    category_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Blogcategory'
    },
    topic_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Topics'
    }
}, { timestamps: true });
exports.BlogModel = (0, mongoose_1.model)("blogs", BlogSchema);
//# sourceMappingURL=blog.js.map