import { Schema, model } from "mongoose";
const QuestionSchema = new Schema({
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
    level: {
        type: String,
        enum: ["advance", "intermediate", "beginners"],
    },
    questiontype: {
        type: String,
        enum: ["fillintheblanks", "checkbox", "radiobutton", "text"],
    },
    user_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Users'
    }

}, { timestamps: true });

export const QuestionModel = model("questions", QuestionSchema);