"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignController = void 0;
const express_1 = require("express");
const models_1 = require("../models");
exports.CampaignController = express_1.Router();
/*
** API NAME: Add campaign
** Methode: POST
*/
exports.CampaignController.post('/add-campaign', async (request, response, next) => {
    try {
        const { body } = request;
        const data = await models_1.CampaignModel.findOne({
            campaignTitle: body.campaignTitle,
            userId: body.userId
        });
        if (data) {
            response.status(200).send({
                "success": false,
                "message": "Oops! campaign already added."
            });
        }
        else {
            let campaignData = new models_1.CampaignModel(body);
            campaignData.save(function (err, data) {
                if (data) {
                    response.status(200).send({
                        "success": true,
                        "message": 'Campaign added successfully done.'
                    });
                }
                else if (err) {
                    response.status(200).send({
                        "success": true,
                        "data": err
                    });
                }
            });
        }
    }
    catch (error) {
        next(error);
    }
});
/*
** API NAME: Campaign list by userid
** Methode: GET
*/
exports.CampaignController.get('/lists/:userid/:skip/:limit', async (request, response, next) => {
    try {
        const { userid } = request.params;
        let skip = parseInt(request.params.skip);
        let limit = parseInt(request.params.limit);
        var ObjectId = require('mongodb').ObjectId;
        var _userId = new ObjectId(userid);
        let campaignData, campaignCount = {};
        let ids = [];
        await models_1.AssetsModel.find({}).then((val) => {
            val.map((a) => {
                let aId = a._id.toString();
                ids.push(aId);
            });
        });
        Promise.all([
            campaignData = await models_1.CampaignModel.aggregate([
                { "$match": { "userId": ObjectId(_userId) } },
                { "$lookup": {
                        from: "videos",
                        localField: "videoId",
                        foreignField: "_id",
                        as: "videos"
                    }
                },
                { "$sort": { "updatedAt": -1 } },
                { "$limit": skip + limit },
                { "$skip": skip }
            ]),
            campaignCount = await models_1.CampaignModel.aggregate([
                { "$match": { "userId": ObjectId(_userId) } },
                { "$lookup": {
                        from: "videos",
                        localField: "videoId",
                        foreignField: "_id",
                        as: "videos"
                    }
                },
                { "$group": { _id: null, count: { "$sum": 1 } } },
            ])
        ]).then(function (data) {
            let newCampaign = [];
            campaignData.map((val) => {
                let newAssets = [];
                let assetsIds = val.assetsId;
                assetsIds.map((val) => {
                    let aId = val.a_id.toString();
                    if (ids.indexOf(aId) !== -1) {
                        newAssets.push(val);
                    }
                });
                val['assetsId'] = newAssets;
                newCampaign.push({ ...val, assetsId: newAssets, assests: newAssets.length });
            });
            response.status(200).send({
                "success": true,
                "data": [{
                        "campaignData": newCampaign,
                        "campaignCount": campaignCount
                    }]
            });
        }).catch(function (error) {
            console.log(error);
            response.status(404).send({
                "success": false,
                "data": error
            });
        });
    }
    catch (error) {
        next(error);
    }
});
/*
** API NAME: Campaign list by id
** Methode: GET
*/
exports.CampaignController.get('/list/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const data = await models_1.CampaignModel.findOne({ _id: ObjectId(_id) });
        if (data) {
            response.status(200).send({
                "success": true,
                "data": data
            });
        }
        else {
            response.status(404).send({
                "success": false,
                "message": "Oops! video not found."
            });
        }
    }
    catch (error) {
        next(error);
    }
});
/*
** API NAME: Delete Campaign
** Methode: DELETE
*/
exports.CampaignController.delete('/delete/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const data = await models_1.CampaignModel.findOneAndRemove({ _id: ObjectId(_id) });
        if (data) {
            response.status(200).send({
                "success": true,
                "message": "Campaign successfully deleted."
            });
        }
        else {
            response.status(404).send({
                "success": false,
                "message": "Oops! Campaign not found."
            });
        }
    }
    catch (error) {
        next(error);
    }
});
/*
** API NAME: Update Campaign
** Methode: PUT
*/
exports.CampaignController.put('/update/:id', async (request, response, next) => {
    try {
        const { body } = request;
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        models_1.CampaignModel.updateOne(query, body, { upsert: true, useFindAndModify: false }, function (err, result) {
            if (err) {
                response.status(404).send({
                    "error": true,
                    "data": err
                });
            }
            else {
                response.status(200).send({
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
/*
** API NAME: Campaign list by video id
** Methode: GET
*/
exports.CampaignController.get('/list-by-videoid/:videoid', async (request, response, next) => {
    try {
        const { videoid } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _vid = new ObjectId(videoid);
        const data = await models_1.CampaignModel.findOne({ videoId: ObjectId(_vid) });
        if (data) {
            response.status(200).send({
                "success": true,
                "data": data && data['assetsId'].length
            });
        }
        else {
            response.status(200).send({
                "success": false,
                "data": 0
            });
        }
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=campaign.js.map