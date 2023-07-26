"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubTopicController = void 0;
const express_1 = require("express");
const models_1 = require("../models");
const express_validator_1 = require("express-validator");
exports.SubTopicController = (0, express_1.Router)();
exports.SubTopicController.post('/add', (0, express_validator_1.check)('name').not().isEmpty().withMessage('SubTopic is required'), (0, express_validator_1.check)('description').not().isEmpty().withMessage('Description is required'), (0, express_validator_1.check)('slug').not().isEmpty().withMessage('slug is required'), (0, express_validator_1.check)('user_id').not().isEmpty().withMessage('user_id is required'), (0, express_validator_1.check)('topic_id').not().isEmpty().withMessage('topic_id is required'), async (request, response, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        else {
            const { body } = request;
            await models_1.SubTopicModel.syncIndexes();
            const data = await models_1.SubTopicModel.find({ "name": body.name });
            if (data.length > 0) {
                response.status(200).send({
                    "success": false,
                    "message": "SubTopic already exists."
                });
            }
            else {
                let SubTopicData = new models_1.SubTopicModel({
                    name: body.name,
                    description: body.description,
                    slug: body.slug,
                    user_id: body.user_id,
                    topic_id: body.topic_id
                });
                SubTopicData.save(function (err, data) {
                    if (data) {
                        response.status(200).send(SubTopicData);
                    }
                    else if (err)
                        throw err;
                });
            }
        }
    }
    catch (error) {
        next(error);
    }
});
exports.SubTopicController.put('/update/:id', async (request, response, next) => {
    try {
        const { body } = request;
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.SubTopicModel.updateOne(query, body, { upsert: true, useFindAndModify: false }, function (err, result) {
            if (err) {
                response.status(404).send({
                    "error": err,
                });
            }
            else {
                response.status(200).send({
                    "success": true,
                    "message": result.nModified == 1 ? "SubTopic Succefully Updated" : "Something Wrong Please Try Again"
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.SubTopicController.delete('/delete/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.SubTopicModel.deleteOne(query).then((val) => {
            if (val.deletedCount == 1) {
                response.status(200).send({
                    "success": [
                        {
                            "msg": "SubTopics deleted successfully"
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
exports.SubTopicController.get('/get/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.SubTopicModel.findOne(query).then((val) => {
            if (val) {
                response.status(200).send({
                    "success": [
                        {
                            "msg": "SubTopics details successfully",
                            "data": val
                        }
                    ]
                });
            }
            else {
                response.status(404).send({
                    "error": [
                        {
                            "msg": "Oops! SubTopic not found."
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
//# sourceMappingURL=subtopic.js.map