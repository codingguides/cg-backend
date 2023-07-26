"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizController = void 0;
const express_1 = require("express");
const models_1 = require("../models");
const express_validator_1 = require("express-validator");
exports.QuizController = (0, express_1.Router)();
exports.QuizController.post('/add', (0, express_validator_1.check)('question').not().isEmpty().withMessage('Quiz is required'), (0, express_validator_1.check)('options').not().isEmpty().withMessage('options is required'), (0, express_validator_1.check)('rightoption').not().isEmpty().withMessage('rightoption is required'), (0, express_validator_1.check)('type').not().isEmpty().withMessage('type is required'), (0, express_validator_1.check)('questiontype').not().isEmpty().withMessage('questiontype is required'), (0, express_validator_1.check)('topic_id').not().isEmpty().withMessage('topic_id is required'), async (request, response, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        else {
            const { body } = request;
            await models_1.QuizModel.syncIndexes();
            const data = await models_1.QuizModel.find({ "question": body.question });
            if (data.length > 0) {
                response.status(200).send({
                    "success": false,
                    "message": "Quiz already exists."
                });
            }
            else {
                let quizData = new models_1.QuizModel({
                    question: body.question,
                    options: body.options,
                    rightoption: body.rightoption,
                    point: body.point,
                    type: body.type,
                    questiontype: body.questiontype,
                    topic_id: body.topic_id
                });
                quizData.save(function (err, data) {
                    if (data) {
                        response.status(200).send(quizData);
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
exports.QuizController.put('/update/:id', async (request, response, next) => {
    try {
        const { body } = request;
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.QuizModel.updateOne(query, body, { upsert: true, useFindAndModify: false }, function (err, result) {
            if (err) {
                response.status(404).send({
                    "error": err,
                });
            }
            else {
                response.status(200).send({
                    "success": true,
                    "message": result.nModified == 1 ? "Quiz Succefully Updated" : "Something Wrong Please Try Again"
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.QuizController.delete('/delete/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.QuizModel.deleteOne(query).then((val) => {
            if (val.deletedCount == 1) {
                response.status(200).send({
                    "success": [
                        {
                            "msg": "Quizs deleted successfully"
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
exports.QuizController.get('/get/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        let query = { _id: ObjectId(_id) };
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        query = { _id: ObjectId(_id) };
        await models_1.QuizModel.find(query).then((val) => {
            if (val) {
                response.status(200).send({
                    "success": [
                        {
                            "msg": "Quizs details successfully",
                            "data": val
                        }
                    ]
                });
            }
            else {
                response.status(404).send({
                    "error": [
                        {
                            "msg": "Oops! Quiz not found."
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
//# sourceMappingURL=quiz.js.map