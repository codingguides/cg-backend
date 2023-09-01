import { Schema, model } from "mongoose";
const BlogSchema = new Schema({
    title: {
        type: String,
    },
    slug: {
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
    }

}, { timestamps: true });

export const BlogModel = model("blogs", BlogSchema);