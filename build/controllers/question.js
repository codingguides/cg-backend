"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionController = void 0;
const express_1 = require("express");
const models_1 = require("../models");
const express_validator_1 = require("express-validator");
exports.QuestionController = (0, express_1.Router)();
exports.QuestionController.post('/add', (0, express_validator_1.check)('question').not().isEmpty().withMessage('Question is required'), (0, express_validator_1.check)('options').not().isEmpty().withMessage('options is required'), (0, express_validator_1.check)('rightoption').not().isEmpty().withMessage('rightoption is required'), (0, express_validator_1.check)('type').not().isEmpty().withMessage('type is required'), (0, express_validator_1.check)('questiontype').not().isEmpty().withMessage('questiontype is required'), (0, express_validator_1.check)('topic_id').not().isEmpty().withMessage('topic_id is required'), async (request, response, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        else {
            const { body } = request;
            await models_1.QuestionModel.syncIndexes();
            const data = await models_1.QuestionModel.find({ "question": body.question });
            if (data.length > 0) {
                response.status(200).send({
                    "success": false,
                    "message": "Question already exists."
                });
            }
            else {
                let QuestionData = new models_1.QuestionModel({
                    question: body.question,
                    options: body.options,
                    rightoption: body.rightoption,
                    point: body.point,
                    type: body.type,
                    questiontype: body.questiontype,
                    topic_id: body.topic_id
                });
                QuestionData.save(function (err, data) {
                    if (data) {
                        response.status(200).send({
                            "status": "SUCCESS",
                            "msg": "Question Added successfully",
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
        next(error);
    }
});
exports.QuestionController.delete('/delete/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.QuestionModel.deleteOne(query).then((val) => {
            if (val.deletedCount == 1) {
                response.status(200).send({
                    "success": [
                        {
                            "msg": "Questions deleted successfully"
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
//# sourceMappingURL=question.js.map