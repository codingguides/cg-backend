"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsController = void 0;
const xrm_core_1 = require("@401_digital/xrm-core");
const express_1 = require("express");
const models_1 = require("../models");
exports.AssetsController = express_1.Router();
/*
** API NAME: Add Assets
** Methode: POST
*/
exports.AssetsController.post('/add-assets', async (request, response, next) => {
    try {
        const { body } = request;
        const data = await models_1.AssetsModel.findOne({ userId: body.userId, assetsName: body.assetsName });
        if (data) {
            response.status(404).send({
                "success": false,
                "message": "Oops! Assets title already added."
            });
        }
        else {
            let AssetsData = new models_1.AssetsModel(body);
            AssetsData.save(function (err, data) {
                if (data) {
                    return data;
                }
                else if (err)
                    throw err;
                console.error("ERROR:> ", err);
            });
            response.status(200).send(new xrm_core_1.SuccessResponse(AssetsData));
        }
    }
    catch (error) {
        next(error);
    }
});
/*
** API NAME: Assets list by userid
** Methode: GET
*/
exports.AssetsController.get('/lists/:userid/:skip/:limit', async (request, response, next) => {
    try {
        const { userid } = request.params;
        let skip = parseInt(request.params.skip);
        let limit = parseInt(request.params.limit);
        var ObjectId = require('mongodb').ObjectId;
        var _userId = new ObjectId(userid);
        let assetsData, assetsCount = {};
        Promise.all([
            assetsData = await models_1.AssetsModel.aggregate([
                { "$match": { "userId": ObjectId(_userId) } },
                { "$sort": { "updatedAt": -1 } },
                { "$limit": skip + limit },
                { "$skip": skip }
            ]),
            assetsCount = await models_1.AssetsModel.aggregate([
                { "$match": { "userId": ObjectId(_userId) } },
                { "$group": { _id: null, count: { "$sum": 1 } } }
            ])
        ]).then(function (data) {
            response.status(200).send({
                "success": true,
                "data": [{
                        "assetsData": assetsData,
                        "assetsCount": assetsCount
                    }]
            });
        }).catch(function (error) {
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
** API NAME: Assets list by id
** Methode: GET
*/
exports.AssetsController.get('/list/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const data = await models_1.AssetsModel.findOne({ _id: ObjectId(_id) });
        if (data) {
            response.status(200).send({
                "success": true,
                "data": data
            });
        }
        else {
            response.status(404).send({
                "success": false,
                "message": "Oops! Assets not found."
            });
        }
    }
    catch (error) {
        next(error);
    }
});
/*
** API NAME: Assets delete by id
** Methode: DELETE
*/
exports.AssetsController.delete('/delete/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const data = await models_1.AssetsModel.findOneAndRemove({ _id: ObjectId(_id) });
        if (data) {
            response.status(200).send({
                "success": true,
                "message": "Assets successfully deleted."
            });
        }
        else {
            response.status(404).send({
                "success": false,
                "message": "Oops! Assets not found."
            });
        }
    }
    catch (error) {
        next(error);
    }
});
/*
** API NAME: Assets update by id
** Methode: PUT
*/
exports.AssetsController.put('/update/:id', async (request, response, next) => {
    try {
        const { body } = request;
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        models_1.AssetsModel.updateOne(query, body, {
            upsert: true,
            useFindAndModify: false,
            returnNewDocument: true,
            new: true,
            strict: false
        }, async function (err, result) {
            if (err) {
                response.status(404).send({
                    "success": true,
                    "data": err
                });
            }
            else {
                const data = await models_1.AssetsModel.findOne({ _id: ObjectId(_id) });
                response.status(200).send({
                    "success": true,
                    "data": data
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=assets.js.map