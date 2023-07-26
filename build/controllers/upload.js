"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const xrm_core_1 = require("@401_digital/xrm-core");
const express_1 = require("express");
/////////////////////////////////////////
var multer = require('multer');
var AWS = require('aws-sdk');
var multerS3 = require('multer-s3');
var accessKeyId = "AKIAQJGJ3SAJ5ZRUC72K";
var secretAccessKey = "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";
AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: 'us-east-1',
    ACL: 'public-read'
});
var s3 = new AWS.S3();
console.log("Date.now()===========================>", Date.now());
////////////////////////////////////////
exports.UploadController = express_1.Router();
exports.UploadController.post('/video', async (request, response, next) => {
    try {
        const { body } = request;
        let key = `videos/development/${Date.now()}.mp4`;
        var buf = new Buffer(body.upload.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        var params = {
            Bucket: 'faneaselive',
            Key: key,
            Body: buf,
            ACL: 'public-read',
            ContentType: 'video/mp4'
        };
        s3.upload(params, function (err, data) {
            if (data) {
                response.status(xrm_core_1.StatusCodes.OK).send({
                    "success": true,
                    "data": data.Location
                });
            }
            else {
                response.status(xrm_core_1.StatusCodes.OK).send({
                    "success": false,
                    "message": "Oops! please try again."
                });
            }
            if (err)
                next(err);
        });
    }
    catch (error) {
        console.log('Oops error !', error);
        next(error);
    }
});
exports.UploadController.post('/image', async (request, response, next) => {
    try {
        const { body } = request;
        var buf = new Buffer(body.upload.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        let key = `images/development/${Date.now()}.png`;
        var params = {
            Bucket: 'faneaselive',
            Key: key,
            Body: buf,
            ContentEncoding: 'base64',
            ContentType: 'image/png',
            ACL: 'public-read'
        };
        s3.putObject(params, function (err, data) {
            if (data) {
                response.status(xrm_core_1.StatusCodes.OK).send({
                    "success": true,
                    "data": `https://faneaselive.s3.amazonaws.com/${key}`
                });
            }
            else {
                response.status(xrm_core_1.StatusCodes.NOT_FOUND).send({
                    "success": false,
                    "message": "Oops! please try again."
                });
            }
            if (err)
                console.log(err);
            else
                console.log("Successfully uploaded ");
        });
    }
    catch (error) {
        console.log('Oops error !', error);
        next(error);
    }
});
//# sourceMappingURL=upload.js.map