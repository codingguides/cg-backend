"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipTopicQuestionController = void 0;
const express_1 = require("express");
const models_1 = require("../models");
const express_validator_1 = require("express-validator");
exports.RelationshipTopicQuestionController = (0, express_1.Router)();
exports.RelationshipTopicQuestionController.post('/add', (0, express_validator_1.check)('topic_id').not().isEmpty().withMessage('Topic id is required'), (0, express_validator_1.check)('question_id').not().isEmpty().withMessage('Question id is required'), async (request, response, next) => {
    try {
        var ObjectId = require('mongodb').ObjectId;
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        else {
            const { body } = request;
            await models_1.TagsModel.syncIndexes();
            let tagData = new models_1.TagsModel({
                topic_id: body.topic_id,
                question_id: ObjectId(body.question_id)
            });
            tagData.save(function (err, data) {
                if (data) {
                    response.status(200).send({
                        "status": "SUCCESS",
                        "msg": "Relation Added successfully",
                        "payload": data
                    });
                }
                else {
                    response.status(200).send({
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
//# sourceMappingURL=relationshipTopicQuestion.js.map