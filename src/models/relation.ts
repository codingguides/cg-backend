import { Schema, model } from "mongoose";
const RelationSchema = new Schema({
    topic_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Topics'
    },
    tag_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Tags'
    }

}, { timestamps: true });

export const RelationModel = model("relation", RelationSchema);