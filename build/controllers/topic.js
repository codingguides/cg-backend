"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicController = void 0;
const express_1 = require("express");
const models_1 = require("../models");
const express_validator_1 = require("express-validator");
// import { Authguard } from "../guards";
exports.TopicController = (0, express_1.Router)();
console.log("<=========================topic -===============>");
// Authguard,
exports.TopicController.post('/add', (0, express_validator_1.check)('name').not().isEmpty().withMessage('Topic is required'), (0, express_validator_1.check)('description').not().isEmpty().withMessage('Description is required'), (0, express_validator_1.check)('slug').not().isEmpty().withMessage('slug is required'), (0, express_validator_1.check)('user_id').not().isEmpty().withMessage('user_id is required'), async (request, response, next) => {
    try {
        console.log("<=========================try -===============>");
        var ObjectId = require('mongodb').ObjectId;
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        else {
            const { body } = request;
            await models_1.TopicModel.syncIndexes();
            const data = await models_1.TopicModel.find({ "name": body.name });
            if (data.length > 0) {
                response.status(200).send({
                    "success": false,
                    "message": "Topic already exists."
                });
            }
            else {
                let topicData = new models_1.TopicModel({
                    name: body.name,
                    description: body.description,
                    slug: body.slug,
                    user_id: body.user_id,
                    parent_id: ObjectId(body.parent_id)
                });
                console.log({
                    name: body.name,
                    description: body.description,
                    slug: body.slug,
                    user_id: body.user_id,
                    parent_id: ObjectId(body.parent_id)
                });
                topicData.save(function (err, data) {
                    if (data) {
                        response.status(200).send(topicData);
                    }
                    else if (err)
                        throw err;
                });
            }
        }
    }
    catch (error) {
        console.log("<=========================catch -===============>");
        next(error);
    }
});
exports.TopicController.put('/update/:id', async (request, response, next) => {
    try {
        const { body } = request;
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.TopicModel.updateOne(query, body, { upsert: true, useFindAndModify: false }, function (err, result) {
            if (err) {
                response.status(404).send({
                    "error": err,
                });
            }
            else {
                response.status(200).send({
                    "success": true,
                    "message": result.nModified == 1 ? "Topic Succefully Updated" : "Something Wrong Please Try Again"
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.TopicController.delete('/delete/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.TopicModel.deleteOne(query).then((val) => {
            if (val.deletedCount == 1) {
                response.status(200).send({
                    "success": [
                        {
                            "msg": "Topics deleted successfully"
                        }
                    ]
                });
            }
            else {
                response.status(404).send({
                    "error": [
                        {
                            "msg": "Oops! something wrong, please try again"
                        }
                    ]
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.TopicController.get('/get/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.TopicModel.findOne(query).then((val) => {
            if (val) {
                response.status(200).send({
                    "success": [
                        {
                            "msg": "Topics details successfully",
                            "data": val
                        }
                    ]
                });
            }
            else {
                response.status(404).send({
                    "error": [
                        {
                            "msg": "Oops! topic not found."
                        }
                    ]
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.TopicController.get('/', async (request, response, next) => {
    try {
        await models_1.TopicModel.aggregate([
            {
                $lookup: {
                    from: "topics",
                    localField: "parent_id",
                    foreignField: "_id",
                    as: "parentDetails"
                }
            }
        ])
            // await TopicModel.find()
            .then((val) => {
            if (val) {
                response.status(200).send({
                    "status": "SUCCESS",
                    "msg": "Topics details successfully",
                    "payload": val
                });
            }
            else {
                response.status(404).send({
                    "status": "ERROR",
                    "msg": "Oops! topic not found.",
                    "payload": []
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=topic.js.map