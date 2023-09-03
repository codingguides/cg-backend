import { Schema, model } from "mongoose";
const relationSchema = new Schema({
    topic_id: {
        type: Schema.Types.ObjectId,
        ref: 'Topics'
    },
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'Questions'
    }
}, { timestamps: true });

export const RelationModel = model("relation", relationSchema);