"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
// create s3 instance using S3Client 
// (this is how we create s3 instance in v3)
const s3 = new S3Client({
    credentials: {
        accessKeyId: "YOUR_ACCESS_KEY_ID_HERE",
        secretAccessKey: "YOUR_SECRET_KEY_HERE"
    },
    region: "ap-south-1" // this is the region that you select in AWS account
});
const s3Storage = multerS3({
    s3: s3,
    bucket: "s3://codingguides/blog/",
    acl: "public-read",
    metadata: (req, file, cb) => {
        cb(null, { fieldname: file.fieldname });
    },
    key: (req, file, cb) => {
        const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
        cb(null, fileName);
    }
});
// function to sanitize files and send error for unsupported files
function sanitizeFile(file, cb) {
    // Define the allowed extension
    const fileExts = [".png", ".jpg", ".jpeg", ".gif"];
    // Check allowed extensions
    const isAllowedExt = fileExts.includes(path_1.default.extname(file.originalname.toLowerCase()));
    // Mime type must be an image
    const isAllowedMimeType = file.mimetype.startsWith("image/");
    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true); // no errors
    }
    else {
        // pass error msg to callback, which can be displaye in frontend
        cb("Error: File type not allowed!");
    }
}
// our middleware
const uploadImage = multer({
    storage: s3Storage,
    fileFilter: (req, file, callback) => {
        sanitizeFile(file, callback);
    },
    limits: {
        fileSize: 1024 * 1024 * 2 // 2mb file size
    }
});
module.exports = uploadImage;
//# sourceMappingURL=upload.js.map