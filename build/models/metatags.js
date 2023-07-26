"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaTagsModel = void 0;
const mongoose_1 = require("mongoose");
const MetaTagsSchema = new mongoose_1.Schema({
    meta_property: {
        type: String,
    },
    meta_description: {
        type: String
    },
    url: {
        type: String
    },
    image: {
        type: String,
    },
    keyword: [],
    slug: {
        type: String,
    },
}, { timestamps: true });
exports.MetaTagsModel = (0, mongoose_1.model)("metatags", MetaTagsSchema);
//# sourceMappingURL=metatags.js.map