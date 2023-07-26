"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsModel = void 0;
const mongoose_1 = require("mongoose");
const TagsSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
}, { timestamps: true });
exports.TagsModel = (0, mongoose_1.model)("tags", TagsSchema);
//# sourceMappingURL=tags.js.map