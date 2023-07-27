import { Schema, model } from "mongoose";
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

export const TopicModel = model("topics", TopicSchema);