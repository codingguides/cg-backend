"use strict";
// @flow
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3_blob_store_1 = __importDefault(require("s3-blob-store"));
const from2_1 = __importDefault(require("from2"));
const dauria_1 = require("dauria");
/**
 * This service describes how to upload image on S3
 * @param buffer
 */
function fromBuffer(buffer) {
    return from2_1.default((size, next) => {
        /**
         * If there's no more content left in the string,
         * close the stream.
         */
        console.log("========buffer.length=======>", buffer.length);
        if (buffer.length <= 0)
            return next(null, null);
        /**
         * Pull in a new chunk of text,
         * removing it from the string.
         */
        const chunk = buffer.slice(0, size);
        buffer = buffer.slice(size);
        /**
         * Emit `chunk` from the stream.
         */
        return next(null, chunk);
    });
}
/**
 * Function to upload image object on S3
 * @param app : App instance
 * @param base64Data : Base64 image data
 * @param path : Image path on S3 (Ext will be suffixed by checking MIME Type
 * @param isDoc : `true` - use secured bucket, `false` - use public bucket
 * @returns {Promise<any>}
 */
function default_1(base64Data, filePath, isbase64Data) {
    var accessKeyId = "AKIA36UWQAPGEZ7NGXVP";
    var secretAccessKey = "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";
    /**
     * Setup s3 auth details
     */
    const s3 = new aws_sdk_1.default.S3({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    });
    /**
     * Setup blob storage
     */
    const blobStore = s3_blob_store_1.default({
        client: s3,
        bucket: 'fanease',
    });
    const { buffer } = isbase64Data ? dauria_1.parseDataURI(base64Data) : base64Data;
    return new Promise((resolve, reject) => {
        fromBuffer(buffer)
            .pipe(blobStore.createWriteStream({ key: filePath }, error => {
            if (error) {
                // Failed writing file on S3
                console.log("error=================>", error);
                reject(error);
            }
            else {
                // Successfully wrote file on S3
                console.log("filePath=================>", filePath);
                resolve(`${filePath}`);
            }
        }))
            .on('error', reject);
    });
}
exports.default = default_1;
//# sourceMappingURL=image.js.map