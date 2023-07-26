"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubTopiceDescriptionModel = void 0;
const mongoose_1 = require("mongoose");
const SubTopiceDescriptionSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    subtopic_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Subtopics'
    }
}, { timestamps: true });
exports.SubTopiceDescriptionModel = (0, mongoose_1.model)("subtopicedescription", SubTopiceDescriptionSchema);
//# sourceMappingURL=subtopicedescription.js.map