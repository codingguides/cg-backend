"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogCategoryModel = void 0;
const mongoose_1 = require("mongoose");
const BlogCategorySchema = new mongoose_1.Schema({
    category: {
        type: String,
    },
    sub_category: {
        type: String
    }
}, { timestamps: true });
exports.BlogCategoryModel = (0, mongoose_1.model)("blogcategory", BlogCategorySchema);
//# sourceMappingURL=blogcategory.js.map