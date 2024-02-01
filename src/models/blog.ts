import { Schema, model } from "mongoose";
const BlogSchema = new Schema({
    title: {
        type: String,
    },
    slug: {
        type: String
    },
    sort_title: {
        type: String,
    },
    sort_slug: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["publish", "draft"],
    },
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'Questions'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Blogcategory'
    },
    topic_id: {
        type: Schema.Types.ObjectId,
        ref: 'Topics'
    }
}, { timestamps: true });

export const BlogModel = model("blogs", BlogSchema);