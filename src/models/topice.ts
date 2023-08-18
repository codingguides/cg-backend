import { Schema, model } from "mongoose";
const mongoosePaginate = require('mongoose-paginate');

const TopicSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'Topics'
    },
    user_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Users'
    }

}, { timestamps: true });

TopicSchema.plugin(mongoosePaginate);

export const TopicModel = model("topics", TopicSchema);