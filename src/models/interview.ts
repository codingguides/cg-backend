import { Schema, model } from "mongoose";
const InterviewSchema = new Schema({
    question: {
        type: String,
    },
    answer: {
        type: String
    },
    type:{
        type:String,
        enum: ["beginner", "intermediate", "advance"],
    },
    topic_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Topics'
    }

}, { timestamps: true });

export const InterviewModel = model("interview", InterviewSchema);