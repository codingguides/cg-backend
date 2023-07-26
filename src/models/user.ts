import { Schema, model } from "mongoose";
const UserSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
    },
    type:{
        type:String,
        enum: ["admin", "authorized", "others"],
    }, 
    isdelete: { 
        type: Boolean
    },
    lastlogindate: { 
        type: String 
    },
}, { timestamps: true });

export const UserModel = model("users", UserSchema);