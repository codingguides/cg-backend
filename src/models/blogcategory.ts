import { Schema, model } from "mongoose";
const BlogCategorySchema = new Schema({
    category: {
        type: String,
    },
    sub_category: {
        type: String
    }
}, { timestamps: true });

export const BlogCategoryModel = model("blogcategory", BlogCategorySchema);