"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizAnalyticsController = void 0;
const express_1 = require("express");
const models_1 = require("../models");
const express_validator_1 = require("express-validator");
exports.QuizAnalyticsController = (0, express_1.Router)();
exports.QuizAnalyticsController.post('/add', (0, express_validator_1.check)('topic_id').not().isEmpty().withMessage('topic_id is required'), (0, express_validator_1.check)('user_id').not().isEmpty().withMessage('user_id is required'), (0, express_validator_1.check)('rating').not().isEmpty().withMessage('rating is required'), (0, express_validator_1.check)('status').not().isEmpty().withMessage('status is required'), async (request, response, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        else {
            const { body } = request;
            await models_1.QuizAnalyticsModel.syncIndexes();
            let QuizAnalyticsData = new models_1.QuizAnalyticsModel({
                topic_id: body.topic_id,
                user_id: body.user_id,
                rating: body.rating,
                status: body.status
            });
            QuizAnalyticsData.save(function (err, data) {
                if (data) {
                    response.status(200).send(QuizAnalyticsData);
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
exports.QuizAnalyticsController.get('/list/:userid', async (request, response, next) => {
    try {
        const { userid } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var u_id = new ObjectId(userid);
        const query = { user_id: ObjectId(u_id) };
        await models_1.QuizAnalyticsModel.findOne(query).then((val) => {
            if (val) {
                response.status(200).send({
                    "success": [
                        {
                            "msg": "Quiz analytics details successfully",
                            "data": val
                        }
                    ]
                });
            }
            else {
                response.status(404).send({
                    "error": [
                        {
                            "msg": "Oops! Quiz analytics not found."
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
//# sourceMappingURL=quizAnalytics.js.map