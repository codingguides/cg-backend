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
    loginType:{
        type:String,
        enum: ["normal", "google", "linkedin"],
    },
    isdelete: { 
        type: Boolean
    },
    lastlogindate: { 
        type: String 
    },
    organization:{
        type: String 
    },
    birthday:{
        type: String 
    },
    location:{
        type: String 
    },
    profile_pic:{
        type: String 
    },
}, { timestamps: true });

export const UserModel = model("users", UserSchema);