"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopicController = void 0;
const express_1 = require("express");
const models_1 = require("../models");
const express_validator_1 = require("express-validator");
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
                let topicData = {};
                if (body.parent_id == 0) {
                    topicData = {
                        name: body.name,
                        description: body.description,
                        slug: body.slug,
                        user_id: ObjectId(body.user_id)
                    };
                }
                else {
                    topicData = {
                        name: body.name,
                        description: body.description,
                        slug: body.slug,
                        user_id: ObjectId(body.user_id),
                        parent_id: ObjectId(body.parent_id)
                    };
                }
                new models_1.TopicModel(topicData).save(function (err, data) {
                    if (data) {
                        response.status(200).send({
                            "status": "SUCCESS",
                            "msg": "Topics Added successfully",
                            "payload": data
                        });
                    }
                    else {
                        response.status(404).send({
                            "status": "ERROR",
                            "msg": "Oops! something wrong",
                            err
                        });
                    }
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
            if (result) {
                response.status(200).send({
                    "status": "SUCCESS",
                    "msg": result.nModified == 1 ? "Topic Succefully Updated" : "Something Wrong Please Try Again"
                });
            }
            else {
                response.status(404).send({
                    "status": "ERROR",
                    "msg": "Oops! topic not found.",
                    err
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
                    "status": "SUCCESS",
                    "msg": "Topics deleted successfully"
                });
            }
            else {
                response.status(404).send({
                    "status": "ERROR",
                    "msg": "Oops! something wrong, please try again"
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
        await models_1.TopicModel.aggregate([
            {
                $match: { _id: ObjectId(_id) }
            },
            {
                $lookup: {
                    from: "tags",
                    localField: "_id",
                    foreignField: "topic_id",
                    as: "tags"
                }
            }
        ])
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
                    "msg": "Oops! topic not found."
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.TopicController.put('/', async (request, response, next) => {
    try {
        const { limit = 10, page = 1, type, search } = request.body;
        const count = await models_1.TopicModel.count();
        let tags = [];
        let query = [];
        if (type === "Tag") {
            console.log("under if");
            await models_1.TagsModel.find({ "type": "topic", "name": search.toUpperCase() }, { "topic_id": 1, "_id": 0 }).then(async (res) => {
                await res.map((tag) => {
                    tags.push(tag.topic_id);
                });
            });
            if (tags.length > 0) {
                console.log("tags>>>>>>>>>>", tags);
                query = [
                    { $match: { _id: { $in: tags } } },
                    {
                        $lookup: {
                            from: "topics",
                            localField: "parent_id",
                            foreignField: "_id",
                            as: "parentDetails"
                        },
                    },
                    {
                        $lookup: {
                            from: "tags",
                            localField: "_id",
                            foreignField: "topic_id",
                            as: "tags"
                        }
                    }
                ];
            }
            else {
                console.log("else tags");
                throw response.status(200).send({
                    "status": "ERROR",
                    "msg": "Oops! topic not found.",
                    "payload": []
                });
            }
            console.log("tags>>>>>", tags);
        }
        else if (type === "Topic") {
            query = [
                { $match: { name: { '$regex': search, '$options': 'i' } } },
                {
                    $lookup: {
                        from: "topics",
                        localField: "parent_id",
                        foreignField: "_id",
                        as: "parentDetails"
                    },
                },
                {
                    $lookup: {
                        from: "tags",
                        localField: "_id",
                        foreignField: "topic_id",
                        as: "tags"
                    }
                }
            ];
        }
        else if (type === "Slug") {
            query = [
                { $match: { slug: { '$regex': search, '$options': 'i' } } },
                {
                    $lookup: {
                        from: "topics",
                        localField: "parent_id",
                        foreignField: "_id",
                        as: "parentDetails"
                    },
                },
                {
                    $lookup: {
                        from: "tags",
                        localField: "_id",
                        foreignField: "topic_id",
                        as: "tags"
                    }
                }
            ];
        }
        else {
            query = [
                {
                    $lookup: {
                        from: "topics",
                        localField: "parent_id",
                        foreignField: "_id",
                        as: "parentDetails"
                    },
                },
                {
                    $lookup: {
                        from: "tags",
                        localField: "_id",
                        foreignField: "topic_id",
                        as: "tags"
                    }
                }
            ];
        }
        console.log("query>>>>>>>>", query);
        await models_1.TopicModel.aggregate(query)
            .skip((page - 1) * limit)
            .limit(limit * 1)
            .then((val) => {
            if (val) {
                response.status(200).send({
                    "status": "SUCCESS",
                    "msg": "Topics details successfully",
                    "payload": val,
                    "totalPages": Math.ceil(count / limit),
                    "currentPage": page
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
exports.TopicController.get('/list', async (request, response, next) => {
    try {
        await models_1.TopicModel.find().then((val) => {
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
                    "msg": "Oops! topic not found."
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=topic.js.map