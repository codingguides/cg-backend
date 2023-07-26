import { Schema, model } from "mongoose";
const MetaTagsSchema = new Schema({
    meta_property: {
        type: String,
    },
    meta_description: {
        type: String
    },
    url: {
        type: String
    },
    image: {
        type: String,
    },
    keyword: [],
    slug: {
        type: String,
    },
    

}, { timestamps: true });

export const MetaTagsModel = model("metatags", MetaTagsSchema);