"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationModel = void 0;
const mongoose_1 = require("mongoose");
const RelationSchema = new mongoose_1.Schema({
    topic_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Topics'
    },
    tag_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Tags'
    }
}, { timestamps: true });
exports.RelationModel = (0, mongoose_1.model)("relation", RelationSchema);
//# sourceMappingURL=relation.js.map