"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubTopicDescriptionController = void 0;
const express_1 = require("express");
const models_1 = require("../models");
const express_validator_1 = require("express-validator");
exports.SubTopicDescriptionController = (0, express_1.Router)();
exports.SubTopicDescriptionController.post('/add', (0, express_validator_1.check)('name').not().isEmpty().withMessage('SubTopicDescription is required'), (0, express_validator_1.check)('description').not().isEmpty().withMessage('Description is required'), (0, express_validator_1.check)('subtopic_id').not().isEmpty().withMessage(' subtopic_id is required'), async (request, response, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        else {
            const { body } = request;
            await models_1.SubTopiceDescriptionModel.syncIndexes();
            const data = await models_1.SubTopiceDescriptionModel.find({ "name": body.name });
            if (data.length > 0) {
                response.status(200).send({
                    "success": false,
                    "message": "Sub Topic Description already exists."
                });
            }
            else {
                let SubTopicDescriptionData = new models_1.SubTopiceDescriptionModel({
                    name: body.name,
                    description: body.description,
                    subtopic_id: body.subtopic_id
                });
                SubTopicDescriptionData.save(function (err, data) {
                    if (data) {
                        response.status(200).send(SubTopicDescriptionData);
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
exports.SubTopicDescriptionController.put('/update/:id', async (request, response, next) => {
    try {
        const { body } = request;
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.SubTopiceDescriptionModel.updateOne(query, body, { upsert: true, useFindAndModify: false }, function (err, result) {
            if (err) {
                response.status(404).send({
                    "error": err,
                });
            }
            else {
                response.status(200).send({
                    "success": true,
                    "message": result.nModified == 1 ? "Sub Topic Description Succefully Updated" : "Something Wrong Please Try Again"
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.SubTopicDescriptionController.delete('/delete/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.SubTopiceDescriptionModel.deleteOne(query).then((val) => {
            if (val.deletedCount == 1) {
                response.status(200).send({
                    "success": [
                        {
                            "msg": "Sub Topic Descriptions deleted successfully"
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
exports.SubTopicDescriptionController.get('/get/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.SubTopiceDescriptionModel.findOne(query).then((val) => {
            if (val) {
                response.status(200).send({
                    "success": [
                        {
                            "msg": "Sub Topic Descriptions details successfully",
                            "data": val
                        }
                    ]
                });
            }
            else {
                response.status(404).send({
                    "error": [
                        {
                            "msg": "Oops! Sub Topic Description not found."
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
//# sourceMappingURL=subtopicdescription.js.map