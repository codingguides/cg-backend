"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipTopicQuestionModel = void 0;
const mongoose_1 = require("mongoose");
const RelationshipTopicQuestionSchema = new mongoose_1.Schema({
    topic_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Topics'
    },
    questions_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Questions'
    }
}, { timestamps: true });
exports.RelationshipTopicQuestionModel = (0, mongoose_1.model)("relationshiptopicquestion", RelationshipTopicQuestionSchema);
//# sourceMappingURL=relationshipTopicQuestion.js.map