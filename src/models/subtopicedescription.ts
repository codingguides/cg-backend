import { Schema, model } from "mongoose";
const SubTopiceDescriptionSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    subtopic_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Subtopics'
    }

}, { timestamps: true });

export const SubTopiceDescriptionModel = model("subtopicedescription", SubTopiceDescriptionSchema);