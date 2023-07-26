import { Schema, model } from "mongoose";
const TagsSchema = new Schema({
    name: {
        type: String,
    },

}, { timestamps: true });

export const TagsModel = model("tags", TagsSchema);