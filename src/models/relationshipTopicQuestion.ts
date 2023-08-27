import { Schema, model } from "mongoose";
const RelationshipTopicQuestionSchema = new Schema({
    topic_id: {
        type: Schema.Types.ObjectId,
        ref: 'Topics'
    },
    questions_id: {
        type: Schema.Types.ObjectId,
        ref: 'Questions'
    }
}, { timestamps: true });

export const RelationshipTopicQuestionModel = model("relationshiptopicquestion", RelationshipTopicQuestionSchema);