import { Schema, model } from "mongoose";
const QuizSchema = new Schema({
    question: {
        type: String,
    },
    options: [],
    rightoption: {
        type: String
    },
    point: {
        type: String
    },
    type: {
        type: String,
        enum: ["Advance", "Intermediate"],
    },
    questiontype: {
        type: String,
        enum: ["Fill-in-the-blanks", "Checkbox", "Radio-button"],
    },
    topic_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Topics'
    },

}, { timestamps: true });

export const QuizModel = model("quiz", QuizSchema);