"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaTagsController = void 0;
const express_1 = require("express");
const models_1 = require("../models");
const express_validator_1 = require("express-validator");
exports.MetaTagsController = (0, express_1.Router)();
exports.MetaTagsController.post('/add', (0, express_validator_1.check)('meta_property').not().isEmpty().withMessage('meta property is required'), (0, express_validator_1.check)('meta_description').not().isEmpty().withMessage('meta description is required'), (0, express_validator_1.check)('url').not().isEmpty().withMessage('url is required'), (0, express_validator_1.check)('keyword').not().isEmpty().withMessage('keyword is required'), (0, express_validator_1.check)('slug').not().isEmpty().withMessage('slug is required'), async (request, response, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        else {
            const { body } = request;
            await models_1.MetaTagsModel.syncIndexes();
            const data = await models_1.MetaTagsModel.find({ "meta_property": body.question });
            if (data.length > 0) {
                response.status(200).send({
                    "success": false,
                    "message": "Meta Tags already exists."
                });
            }
            else {
                let MetaTagsData = new models_1.MetaTagsModel({
                    meta_property: body.meta_property,
                    meta_description: body.meta_description,
                    url: body.url,
                    image: body.image,
                    keyword: body.keyword,
                    slug: body.slug
                });
                MetaTagsData.save(function (err, data) {
                    if (data) {
                        response.status(200).send(MetaTagsData);
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
exports.MetaTagsController.put('/update/:id', async (request, response, next) => {
    try {
        const { body } = request;
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.MetaTagsModel.updateOne(query, body, { upsert: true, useFindAndModify: false }, function (err, result) {
            if (err) {
                response.status(404).send({
                    "error": err,
                });
            }
            else {
                response.status(200).send({
                    "success": true,
                    "message": result.nModified == 1 ? "Meta Tags Succefully Updated" : "Something Wrong Please Try Again"
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.MetaTagsController.delete('/delete/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.MetaTagsModel.deleteOne(query).then((val) => {
            if (val.deletedCount == 1) {
                response.status(200).send({
                    "success": [
                        {
                            "msg": "Meta Tags deleted successfully"
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
exports.MetaTagsController.get('/get/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.MetaTagsModel.findOne(query).then((val) => {
            if (val) {
                response.status(200).send({
                    "success": [
                        {
                            "msg": "Meta Tags details successfully",
                            "data": val
                        }
                    ]
                });
            }
            else {
                response.status(404).send({
                    "error": [
                        {
                            "msg": "Oops! Meta Tags not found."
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
//# sourceMappingURL=metatags.js.map