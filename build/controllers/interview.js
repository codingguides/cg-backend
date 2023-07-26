"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewController = void 0;
const express_1 = require("express");
const models_1 = require("../models");
const express_validator_1 = require("express-validator");
exports.InterviewController = (0, express_1.Router)();
exports.InterviewController.post('/add', (0, express_validator_1.check)('question').not().isEmpty().withMessage('question is required'), (0, express_validator_1.check)('answer').not().isEmpty().withMessage('answer is required'), (0, express_validator_1.check)('type').not().isEmpty().withMessage('type is required'), (0, express_validator_1.check)('topic_id').not().isEmpty().withMessage('topic_id is required'), async (request, response, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        else {
            const { body } = request;
            await models_1.InterviewModel.syncIndexes();
            const data = await models_1.InterviewModel.find({ "question": body.question });
            if (data.length > 0) {
                response.status(200).send({
                    "success": false,
                    "message": "Interview already exists."
                });
            }
            else {
                let InterviewData = new models_1.InterviewModel({
                    question: body.question,
                    answer: body.answer,
                    type: body.type,
                    topic_id: body.topic_id
                });
                InterviewData.save(function (err, data) {
                    if (data) {
                        response.status(200).send(InterviewData);
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
exports.InterviewController.put('/update/:id', async (request, response, next) => {
    try {
        const { body } = request;
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.InterviewModel.updateOne(query, body, { upsert: true, useFindAndModify: false }, function (err, result) {
            if (err) {
                response.status(404).send({
                    "error": err,
                });
            }
            else {
                response.status(200).send({
                    "success": true,
                    "message": result.nModified == 1 ? "Interview Succefully Updated" : "Something Wrong Please Try Again"
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.InterviewController.delete('/delete/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.InterviewModel.deleteOne(query).then((val) => {
            if (val.deletedCount == 1) {
                response.status(200).send({
                    "success": [
                        {
                            "msg": "Interview deleted successfully"
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
exports.InterviewController.get('/get/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.InterviewModel.findOne(query).then((val) => {
            if (val) {
                response.status(200).send({
                    "success": [
                        {
                            "msg": "Interview details successfully",
                            "data": val
                        }
                    ]
                });
            }
            else {
                response.status(404).send({
                    "error": [
                        {
                            "msg": "Oops! Interview not found."
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
//# sourceMappingURL=interview.js.map