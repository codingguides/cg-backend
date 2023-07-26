"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoController = void 0;
const xrm_core_1 = require("@401_digital/xrm-core");
const express_1 = require("express");
const models_1 = require("../models");
exports.VideoController = express_1.Router();
exports.VideoController.post('/add-video', async (request, response, next) => {
    try {
        const { body } = request;
        console.clear();
        console.log("body===========>", body);
        const data = await models_1.VideoModel.findOne({ videoTitle: body.videoTitle });
        if (data) {
            response.status(xrm_core_1.StatusCodes.NOT_FOUND).send({
                "success": false,
                "message": "Oops! video title already added."
            });
        }
        else {
            let videoData = new models_1.VideoModel({
                userId: body.userId,
                videoTitle: body.videoTitle,
                videoSlug: body.videoSlug,
                videoImage: body.videoImage,
                videoBeneathImage: body.videoBeneathImage,
                videoDescription: body.videoDescription,
                videoDate: body.videoDate,
                videoTime: body.videoTime,
                videoTimeStatus: body.videoTimeStatus,
                videoType: body.videoType,
                videoStatus: body.videoStatus,
                videoUrl: body.videoUrl,
                video: body.video,
                view: 0,
                click: 0
            });
            videoData.save(function (err, data) {
                if (data) {
                    return data;
                }
                else if (err)
                    throw err;
                console.error("ERROR:> ", err);
            });
            response.status(xrm_core_1.StatusCodes.OK).send(new xrm_core_1.SuccessResponse(videoData));
        }
    }
    catch (error) {
        next(error);
    }
});
exports.VideoController.get('/list/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const data = await models_1.VideoModel.findOne({ _id: ObjectId(_id) });
        if (data) {
            response.status(xrm_core_1.StatusCodes.OK).send({
                "success": true,
                "data": data
            });
        }
        else {
            response.status(xrm_core_1.StatusCodes.NOT_FOUND).send({
                "success": false,
                "message": "Oops! video not found."
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.VideoController.delete('/delete/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const data = await models_1.VideoModel.findOneAndRemove({ _id: ObjectId(_id) });
        //console.log("data===========>",data)
        if (data) {
            response.status(xrm_core_1.StatusCodes.OK).send({
                "success": true,
                "message": "Video successfully deleted."
            });
        }
        else {
            response.status(xrm_core_1.StatusCodes.NOT_FOUND).send({
                "success": false,
                "message": "Oops! video not found."
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.VideoController.get('/lists/:userid/:skip/:limit', async (request, response, next) => {
    try {
        const { userid } = request.params;
        let skip = parseInt(request.params.skip);
        let limit = parseInt(request.params.limit);
        var ObjectId = require('mongodb').ObjectId;
        var _userId = new ObjectId(userid);
        let videoData, videoCount = {};
        Promise.all([
            videoData = await models_1.VideoModel.aggregate([
                { "$match": { "userId": ObjectId(_userId) } },
                { "$lookup": {
                        from: "assets",
                        localField: "_id",
                        foreignField: "videoId",
                        as: "asstesDetails"
                    }
                },
                { "$sort": { "updatedAt": -1 } },
                { "$limit": skip + limit },
                { "$skip": skip }
            ]),
            videoCount = await models_1.VideoModel.aggregate([
                { "$match": { "userId": ObjectId(_userId) } },
                { "$lookup": {
                        from: "assets",
                        localField: "_id",
                        foreignField: "videoId",
                        as: "asstesDetails"
                    }
                },
                { "$group": { _id: null, count: { "$sum": 1 } } }
            ])
        ]).then(function (data) {
            response.status(xrm_core_1.StatusCodes.OK).send({
                "success": true,
                "data": [{
                        "videoData": videoData,
                        "videoCount": videoCount
                    }]
            });
        }).catch(function (error) {
            console.log(error);
            response.status(xrm_core_1.StatusCodes.NOT_FOUND).send({
                "success": false,
                "data": error
            });
        });
    }
    catch (error) {
        next(error);
    }
});
exports.VideoController.put('/update/:id', async (request, response, next) => {
    try {
        const { body } = request;
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        console.log("body=============>", body);
        models_1.VideoModel.updateOne(query, body, { upsert: true, useFindAndModify: false }, function (err, result) {
            if (err) {
                response.status(xrm_core_1.StatusCodes.NOT_FOUND).send({
                    "success": true,
                    "data": err
                });
            }
            else {
                response.status(xrm_core_1.StatusCodes.OK).send({
                    "success": true,
                    "data": result
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.VideoController.get('/update-status/:vid/:uid', async (request, response, next) => {
    try {
        const { uid, vid } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _uid = new ObjectId(uid);
        var _vid = new ObjectId(vid);
        models_1.VideoModel.updateMany({ userId: ObjectId(_uid) }, { isDefult: false }, { upsert: true, useFindAndModify: false }, function (err, result) {
            if (err) {
                response.status(xrm_core_1.StatusCodes.NOT_FOUND).send({
                    "success": true,
                    "data": err
                });
            }
            else {
                models_1.VideoModel.updateOne({ _id: ObjectId(_vid) }, { isDefult: true }, { upsert: true, useFindAndModify: false }, function (err, result) {
                    if (err) {
                        response.status(xrm_core_1.StatusCodes.NOT_FOUND).send({
                            "success": true,
                            "data": err
                        });
                    }
                    else {
                        response.status(xrm_core_1.StatusCodes.OK).send({
                            "success": true,
                            "data": result
                        });
                    }
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=video.js.map