"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicModel = void 0;
const mongoose_1 = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
const TopicSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    slug: {
        type: String,
    },
    description: {
        type: String
    },
    parent_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Topics'
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Users'
    },
    showNav: {
        type: Boolean,
        default: 0
    },
    index_no: {
        type: String,
    },
    home_tagline: {
        type: String,
    },
    homeTaglineIcon: {
        type: String,
    },
    showFeatures: {
        type: Boolean,
        default: 0
    },
    featureImg: {
        type: String,
    }
}, { timestamps: true });
TopicSchema.plugin(mongoosePaginate);
exports.TopicModel = (0, mongoose_1.model)("topics", TopicSchema);
//# sourceMappingURL=topice.js.map