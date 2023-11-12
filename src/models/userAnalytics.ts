import { Schema, model } from "mongoose";
const UserAnalyticsSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    topic_id: {
        type: Schema.Types.ObjectId,
        ref: 'Topics'
    },
    attendedQuestionCount: {
        type: String,
    },
    attendedAnswerCount: {
        type: String,
    },
    rightAnswerCount: {
        type: String,
    },
    status:{
        type:String,
        enum: ["pass", "failed", "not completed"],
    },
    point: {
        type: Number
    }
}, { timestamps: true });

export const UserAnalyticsModel = model("userAnalytics", UserAnalyticsSchema);