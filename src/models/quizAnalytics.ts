import { Schema, model } from "mongoose";
const quizAnalyticsSchema = new Schema({
    topic_slug: {
        type: String,
        ref: 'Topics'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    rating: {
        type: String
    },
    status: {
        type: String,
        enum: ["completed", "not-completed"],
    }
}, { timestamps: true });

export const QuizAnalyticsModel = model("quizAnalytics", quizAnalyticsSchema);