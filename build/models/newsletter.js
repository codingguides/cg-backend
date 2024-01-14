"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterModel = void 0;
const mongoose_1 = require("mongoose");
const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};
const NewsletterSchema = new mongoose_1.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }
}, { timestamps: true });
exports.NewsletterModel = (0, mongoose_1.model)("newsletter", NewsletterSchema);
//# sourceMappingURL=newsletter.js.map