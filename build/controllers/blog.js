"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const express_1 = require("express");
const models_1 = require("../models");
const express_validator_1 = require("express-validator");
exports.BlogController = (0, express_1.Router)();
exports.BlogController.post("/add", (0, express_validator_1.check)("title").not().isEmpty().withMessage("Title is required"), (0, express_validator_1.check)("slug").not().isEmpty().withMessage("Slug is required"), (0, express_validator_1.check)("description").not().isEmpty().withMessage("Description is required"), (0, express_validator_1.check)("feature_image").not().isEmpty().withMessage("Feature Image is required"), (0, express_validator_1.check)("status").not().isEmpty().withMessage("Status is required"), 
// check("question_id").not().isEmpty().withMessage("question_id is required"),
(0, express_validator_1.check)("user_id").not().isEmpty().withMessage("user_id is required"), (0, express_validator_1.check)("category_id").not().isEmpty().withMessage("category id is required"), async (request, response, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        else {
            const { body } = request;
            await models_1.BlogModel.syncIndexes();
            const data = await models_1.BlogModel.find({ slug: body.slug });
            if (data.length > 0) {
                response.status(200).send({
                    success: false,
                    message: "Blog already exists.",
                });
            }
            else {
                let QuestionData = new models_1.BlogModel({
                    title: body.title,
                    slug: body.slug,
                    description: body.description,
                    feature_image: body.feature_image,
                    status: body.status,
                    question_id: body.question_id,
                    user_id: body.user_id,
                    category_id: body.category_id,
                    topic_id: body.topic_id
                });
                QuestionData.save(function (err, data) {
                    if (data) {
                        response.status(200).send({
                            status: "SUCCESS",
                            msg: "Blog Added successfully",
                            payload: data,
                        });
                    }
                    else {
                        response.status(404).send({
                            status: "ERROR",
                            msg: "Oops! something wrong",
                            err,
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
exports.BlogController.put("/update/:id", async (request, response, next) => {
    try {
        const { body } = request;
        const { id } = request.params;
        var ObjectId = require("mongodb").ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.BlogModel.updateOne(query, body, { upsert: true, useFindAndModify: false }, function (err, result) {
            if (result) {
                response.status(200).send({
                    status: "SUCCESS",
                    msg: result.nModified == 1
                        ? "Blog Succefully Updated"
                        : "Something Wrong Please Try Again",
                });
            }
            else {
                response.status(404).send({
                    status: "ERROR",
                    msg: "Oops! Blog not found.",
                    err,
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.BlogController.delete("/delete/:id", async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require("mongodb").ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.BlogModel.deleteOne(query).then((val) => {
            if (val.deletedCount == 1) {
                response.status(200).send({
                    status: "SUCCESS",
                    msg: "Blog deleted successfully",
                });
            }
            else {
                response.status(404).send({
                    status: "ERROR",
                    msg: "Oops! something wrong, please try again",
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.BlogController.get("/", async (request, response, next) => {
    try {
        await models_1.BlogModel.find().then((val) => {
            if (val) {
                response.status(200).send({
                    status: "SUCCESS",
                    msg: "Blog details successfully",
                    payload: val,
                });
            }
            else {
                response.status(404).send({
                    status: "ERROR",
                    msg: "Oops! Blog not found.",
                    payload: [],
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.BlogController.put('/', async (request, response, next) => {
    try {
        const { limit = 3, page = 1, type, search, status } = request.body;
        const count = await models_1.BlogModel.count();
        let query = [];
        if (type == "title") {
            query = [{ $match: { title: { '$regex': search, '$options': 'i' } } }];
        }
        else if (type == "slug") {
            query = [{ $match: { slug: { '$regex': search, '$options': 'i' } } }];
        }
        else if (type == "status") {
            query = [{ $match: { status: status } }];
        }
        await models_1.BlogModel.aggregate(query)
            .skip((page - 1) * limit)
            .limit(limit * 1)
            .then((val) => {
            if (val) {
                response.status(200).send({
                    "status": "SUCCESS",
                    "msg": "Blog details successfully",
                    "payload": val,
                    "totalPages": Math.ceil(count / limit),
                    "currentPage": page
                });
            }
            else {
                response.status(404).send({
                    "status": "ERROR",
                    "msg": "Oops! blog not found.",
                    "payload": []
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.BlogController.get("/", async (request, response, next) => {
    try {
        await models_1.BlogModel.find().then((val) => {
            if (val) {
                response.status(200).send({
                    status: "SUCCESS",
                    msg: "Blog details successfully",
                    payload: val,
                });
            }
            else {
                response.status(404).send({
                    status: "ERROR",
                    msg: "Oops! Blog not found.",
                    payload: [],
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
// ===================================================================== //
exports.BlogController.get("/get/category/:category", async (request, response, next) => {
    try {
        const { category } = request.params;
        await models_1.BlogCategoryModel.find({ "category": category }).then((val) => {
            if (val) {
                response.status(200).send({
                    status: "SUCCESS",
                    msg: "Category details successfully",
                    payload: val,
                });
            }
            else {
                response.status(404).send({
                    status: "ERROR",
                    msg: "Oops! category not found.",
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.BlogController.post("/category/add", (0, express_validator_1.check)("category").not().isEmpty().withMessage("category is required"), (0, express_validator_1.check)("sub_category").not().isEmpty().withMessage("sub category is required"), async (request, response, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }
        else {
            const { body } = request;
            await models_1.BlogCategoryModel.syncIndexes();
            const data = await models_1.BlogCategoryModel.find({ sub_category: body.sub_category });
            if (data.length > 0) {
                response.status(200).send({
                    success: false,
                    message: "Blog category already exists.",
                });
            }
            else {
                let QuestionData = new models_1.BlogCategoryModel({
                    category: body.category,
                    sub_category: body.sub_category
                });
                QuestionData.save(function (err, data) {
                    if (data) {
                        response.status(200).send({
                            status: "SUCCESS",
                            msg: "Blog Added successfully",
                            payload: data,
                        });
                    }
                    else {
                        response.status(404).send({
                            status: "ERROR",
                            msg: "Oops! something wrong",
                            err,
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
//# sourceMappingURL=blog.js.map