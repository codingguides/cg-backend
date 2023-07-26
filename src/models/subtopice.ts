import { Schema, model } from "mongoose";
const SubTopicSchema = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String
    },
    slug: {
        type: String,
    },
    topic_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Topics'
    },
    user_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Users'
    }

}, { timestamps: true });

export const SubTopicModel = model("subtopics", SubTopicSchema);