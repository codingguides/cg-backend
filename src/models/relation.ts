import { Schema, model } from "mongoose";
const relationSchema = new Schema({
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
    },
    type:{
        type:String,
        enum: ["blog", "topic"],
    },
}, { timestamps: true });

export const RelationModel = model("relation", relationSchema);