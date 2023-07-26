"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubTopicModel = void 0;
const mongoose_1 = require("mongoose");
const SubTopicSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },
    slug: {
        type: String,
    },
    topic_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Topics'
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Users'
    }
}, { timestamps: true });
exports.SubTopicModel = (0, mongoose_1.model)("subtopics", SubTopicSchema);
//# sourceMappingURL=subtopice.js.map