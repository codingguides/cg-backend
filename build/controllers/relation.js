"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationController = void 0;
const express_1 = require("express");
const models_1 = require("../models");
const express_validator_1 = require("express-validator");
exports.RelationController = (0, express_1.Router)();
exports.RelationController.post('/add', (0, express_validator_1.check)('topic_id').not().isEmpty().withMessage('topic_id is required'), (0, express_validator_1.check)('tag_id').not().isEmpty().withMessage('tag_id is required'), async (request, response, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        else {
            const { body } = request;
            await models_1.RelationModel.syncIndexes();
            let tagData = new models_1.RelationModel({
                topic_id: body.topic_id,
                tag_id: body.tag_id
            });
            tagData.save(function (err, data) {
                if (data) {
                    response.status(200).send(tagData);
                }
                else if (err)
                    throw err;
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.RelationController.delete('/delete/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.RelationModel.deleteOne(query).then((val) => {
            if (val.deletedCount == 1) {
                response.status(200).send({
                    "success": [
                        {
                            "msg": "Relation deleted successfully"
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
exports.RelationController.post('/get-related-tags', async (request, response, next) => {
    try {
        const { body } = request;
        await models_1.RelationModel.find({
            $and: [
                { "topic_id": body.topic_id },
                { "tag_id": body.tag_id }
            ]
        }).then((val) => {
            if (val) {
                response.status(200).send({
                    "success": [
                        {
                            "msg": "Tag Relation details successfully fetched",
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
//# sourceMappingURL=relation.js.map