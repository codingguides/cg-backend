"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsController = void 0;
const express_1 = require("express");
const models_1 = require("../models");
const express_validator_1 = require("express-validator");
const guards_1 = require("../guards");
exports.TagsController = (0, express_1.Router)();
exports.TagsController.post('/add', (0, express_validator_1.check)('name').not().isEmpty().withMessage('Tag is required'), async (request, response, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        else {
            const { body } = request;
            await models_1.TagsModel.syncIndexes();
            const data = await models_1.TagsModel.find({ "name": body.name });
            if (data.length > 0) {
                response.status(200).send({
                    "success": false,
                    "message": "Tag already exists."
                });
            }
            else {
                let tagData = new models_1.TagsModel({
                    name: body.name
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
                    "success": [
                        {
                            "msg": "Tags deleted successfully"
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