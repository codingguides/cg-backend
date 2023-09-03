"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationModel = void 0;
const mongoose_1 = require("mongoose");
const relationSchema = new mongoose_1.Schema({
    topic_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Topics'
    },
    question_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Questions'
    }
}, { timestamps: true });
exports.RelationModel = (0, mongoose_1.model)("relation", relationSchema);
//# sourceMappingURL=relation.js.map