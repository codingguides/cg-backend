import { Schema, model } from "mongoose";
const TagsSchema = new Schema({
    name: {
        type: String,
    },
    type: {
        type:String,
        enum: ["topic", "question","blog"],
    },
    topic_id: {
        type: Schema.Types.ObjectId,
        ref: 'Topics'
    },
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'Questions'
    },
    blog_id: {
        type: Schema.Types.ObjectId,
        ref: 'Blogs'
    }
}, { timestamps: true });

export const TagsModel = model("tags", TagsSchema);