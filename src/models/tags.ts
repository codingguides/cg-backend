import { Schema, model } from "mongoose";
const TagsSchema = new Schema({
    name: {
        type: String,
    },
    type: {
        type:String,
        enum: ["topic", "questions"],
    },
    topic_id: {
        type: Schema.Types.ObjectId,
        ref: 'Topics'
    },
    questions_id: {
        type: Schema.Types.ObjectId,
        ref: 'Questions'
    }
}, { timestamps: true });

export const TagsModel = model("tags", TagsSchema);