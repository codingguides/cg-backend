"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsController = void 0;
const express_1 = require("express");
const models_1 = require("../models");
const express_validator_1 = require("express-validator");
const guards_1 = require("../guards");
exports.TagsController = (0, express_1.Router)();
exports.TagsController.post('/add', (0, express_validator_1.check)('name').not().isEmpty().withMessage('Tag is required'), (0, express_validator_1.check)('type').not().isEmpty().withMessage('Tag type is required'), async (request, response, next) => {
    try {
        var ObjectId = require('mongodb').ObjectId;
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        else {
            const { body } = request;
            let queryOBJ = {};
            if (body.type == "question") {
                queryOBJ = {
                    name: (body.name).trim().toUpperCase(),
                    type: body.type,
                    question_id: ObjectId(body.question_id)
                };
            }
            else if (body.type == "topic") {
                queryOBJ = {
                    name: (body.name).trim().toUpperCase(),
                    type: body.type,
                    topic_id: ObjectId(body.topic_id)
                };
            }
            else if (body.type == "blog") {
                queryOBJ = {
                    name: (body.name).trim().toUpperCase(),
                    type: body.type,
                    blog_id: ObjectId(body.blog_id)
                };
            }
            await models_1.TagsModel.syncIndexes();
            let tagData = new models_1.TagsModel(queryOBJ);
            tagData.save(function (err, data) {
                if (data) {
                    response.status(200).send({
                        "status": "SUCCESS",
                        "msg": "Tags Added successfully",
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
    catch (error) {
        next(error);
    }
});
exports.TagsController.delete('/delete/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.TagsModel.deleteOne(query).then((val) => {
            if (val.deletedCount == 1) {
                response.status(200).send({
                    "status": "SUCCESS",
                    "msg": "Tags deleted successfully"
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
exports.TagsController.post('/search', async (request, response, next) => {
    try {
        const { body } = request;
        (0, guards_1.Authguard)(request, response, next);
        const authorization = request.headers['authorization'];
        console.log("authorization>>>>>>>>>>>>>>>>>>", authorization);
        await models_1.TagsModel.find({ name: { '$regex': body.name } }).then((val) => {
            if (val) {
                response.status(200).send({
                    "success": [
                        {
                            "msg": "Tags details successfully fetched",
                            "data": val
                        }
                    ]
                });
            }
            else {
                response.status(404).send({
                    "error": [
                        {
                            "msg": "Oops! tag not found."
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
//# sourceMappingURL=tag.js.map