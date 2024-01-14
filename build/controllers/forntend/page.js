"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrontendController = void 0;
const express_1 = require("express");
const models_1 = require("../../models");
const express_validator_1 = require("express-validator");
exports.FrontendController = (0, express_1.Router)();
exports.FrontendController.get('/get-menu', async (request, response, next) => {
    try {
        await models_1.TopicModel.find({ "showNav": true }).sort({ index_no: 1 }).then((val) => {
            if (val) {
                response.status(200).send({
                    "status": "SUCCESS",
                    "msg": "Topics details successfully",
                    "payload": val
                });
            }
            else {
                response.status(200).send({
                    "status": "ERROR",
                    "msg": "Oops! topic not found."
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.FrontendController.get('/get-feature-item', async (request, response, next) => {
    try {
        await models_1.TopicModel.find({ "showFeatures": true }).sort({ index_no: 1 }).then((val) => {
            if (val) {
                response.status(200).send({
                    "status": "SUCCESS",
                    "msg": "Features details successfully",
                    "payload": val
                });
            }
            else {
                response.status(200).send({
                    "status": "ERROR",
                    "msg": "Oops! features not found."
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.FrontendController.get('/get-sidebar-menu', async (request, response, next) => {
    try {
        async function buildCategoryTree(categories) {
            const categoryMap = {}; // Use a map for faster lookups
            // Create a map of categories using _id as keys
            categories.forEach(category => {
                categoryMap[category._id] = category;
                category.children = [];
            });
            const tree = [];
            // Organize categories into a tree structure
            categories.forEach(category => {
                if (category.parent_id) {
                    const parentCategory = categoryMap[category.parent_id];
                    if (parentCategory) {
                        parentCategory.children.push(category);
                    }
                }
                else {
                    tree.push(category);
                }
            });
            return tree;
        }
        let cateList = [];
        let obj = {};
        await models_1.TopicModel.find().then((topicList) => {
            topicList.map((topic) => {
                if (topic.parent_id) {
                    obj = {
                        _id: String(topic._id),
                        name: String(topic.name),
                        slug: String(topic.slug),
                        parent_id: String(topic.parent_id)
                    };
                }
                else {
                    obj = {
                        _id: String(topic._id),
                        name: String(topic.name),
                        slug: String(topic.slug)
                    };
                }
                cateList.push(obj);
            });
        });
        const categoryTree = await buildCategoryTree(cateList);
        if (categoryTree) {
            response.status(200).send({
                "status": "SUCCESS",
                "msg": "Topics details successfully",
                "payload": categoryTree
            });
        }
        else {
            response.status(404).send({
                "status": "ERROR",
                "msg": "Oops! topic not found."
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.FrontendController.get('/get-quiz-list/:slug', async (request, response, next) => {
    try {
        const { slug } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        await models_1.TopicModel.findOne({ "slug": slug }).then(async (val) => {
            console.log(val);
            console.log(val._id);
            if (val && val._id) {
                console.log("if");
                await models_1.TopicModel.find({ "parent_id": ObjectId(val._id) }).then((sublist) => {
                    if (sublist) {
                        console.log("sublist if", sublist);
                        response.status(200).send({
                            "status": "SUCCESS",
                            "msg": "Sub Topics details successfully",
                            "payload": sublist
                        });
                    }
                    else {
                        console.log("sub else");
                        response.status(200).send({
                            "status": "ERROR",
                            "msg": "Oops! sub topic not found."
                        });
                    }
                });
            }
            else {
                console.log("else");
                response.status(200).send({
                    "status": "ERROR",
                    "msg": "Oops! slug not found."
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.FrontendController.get('/search/:topic', async (request, response, next) => {
    try {
        const { topic } = request.params;
        await models_1.TagsModel.aggregate([
            { $match: { 'name': { '$regex': topic.toUpperCase() }, type: 'topic' } },
            {
                $lookup: {
                    from: "topics",
                    localField: "topic_id",
                    foreignField: "_id",
                    as: "topicDetails"
                },
            }
        ]).then(async (val) => {
            console.log(val);
            let newarray = [];
            if (val) {
                val.map(async (value) => {
                    if (value.topicDetails.length > 0) {
                        if (value.topicDetails[0].parent_id == null) {
                            await newarray.push(value.topicDetails[0]);
                        }
                    }
                });
                response.status(200).send({
                    "status": "SUCCESS",
                    "msg": "Topics details successfully",
                    "payload": newarray
                });
            }
            else {
                response.status(200).send({
                    "status": "ERROR",
                    "msg": "Oops! topic not found."
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.FrontendController.get('/quiz/:slug', async (request, response, next) => {
    try {
        const { slug } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        await models_1.TopicModel.findOne({ "slug": slug }).then(async (val) => {
            console.log("val>>>>>>>>>>>>>", val);
            if (val && val._id) {
                await models_1.RelationModel.find({ 'topic_id': ObjectId(val._id) }, { question_id: 1 }).then(async (relationdata) => {
                    const relationIds = relationdata.map((rel) => ObjectId(rel.question_id));
                    console.log(relationIds, "<<<<<<<<<<<<relationdata>>>>>>>>>>>>>", relationdata);
                    if (relationdata) {
                        await models_1.QuestionModel.find({ _id: { $in: relationIds } }).then(async (questions) => {
                            console.log("questions>>>>>>>>>>>>>", questions);
                            if (questions) {
                                response.status(200).send({
                                    "status": "SUCCESS",
                                    "msg": "Questions details successfully",
                                    "payload": questions
                                });
                            }
                            else {
                                response.status(200).send({
                                    "status": "ERROR",
                                    "msg": "Oops! questions not found."
                                });
                            }
                        });
                    }
                    else {
                        response.status(200).send({
                            "status": "ERROR",
                            "msg": "Oops! relation not found."
                        });
                    }
                });
            }
            else {
                response.status(200).send({
                    "status": "ERROR",
                    "msg": "Oops! relation not found."
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.FrontendController.post('/newsletter', (0, express_validator_1.body)('email', "Invalid Email!").isEmail(), async (request, response, next) => {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(200).send({
            result: 'error',
            "errors": errors.array()
        });
    }
    else {
        try {
            const { body } = request;
            await models_1.NewsletterModel.syncIndexes();
            const data = await models_1.NewsletterModel.find({
                $or: [
                    { "email": body.email }
                ]
            });
            if (data.length > 0) {
                response.status(200).send({
                    result: 'error',
                    "errors": [
                        {
                            "success": false,
                            "msg": "This email already exists in our system."
                        }
                    ]
                });
            }
            else {
                let userData = new models_1.NewsletterModel({
                    email: body.email
                });
                userData.save(function (err, data) {
                    if (data) {
                        response.status(200).send({
                            result: 'success',
                            "success": [
                                {
                                    "success": true,
                                    "msg": "We will get back to you soon."
                                }
                            ]
                        });
                    }
                    else if (err)
                        throw err;
                });
            }
        }
        catch (error) {
            next(error);
        }
    }
});
exports.FrontendController.get('/blog', async (request, response, next) => {
    try {
        await models_1.BlogModel.find().limit(10).then((val) => {
            if (val) {
                response.status(200).send({
                    "status": "SUCCESS",
                    "msg": "Blog details successfully",
                    "payload": val
                });
            }
            else {
                response.status(200).send({
                    "status": "ERROR",
                    "msg": "Oops! blog not found."
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
// For forntend example details page
exports.FrontendController.get('/blog/:slug', async (request, response, next) => {
    try {
        const { slug } = request.params;
        await models_1.TopicModel.findOne({ "slug": slug }).then(async (val) => {
            if (val) {
                await models_1.BlogCategoryModel.syncIndexes();
                await models_1.BlogCategoryModel.aggregate([
                    { $match: { 'category': { '$regex': slug } } },
                    {
                        $lookup: {
                            from: "blogs",
                            localField: "_id",
                            foreignField: "category_id",
                            as: "blogDetails"
                        },
                    },
                    { $sort: { category: 1 } }
                ]).then(async (res) => {
                    const categoryMap = {};
                    res.forEach(category => {
                        categoryMap[category.sub_category] = category;
                    });
                    if (res) {
                        response.status(200).send({
                            "status": "SUCCESS",
                            "msg": "Blog details successfully",
                            "payload": {
                                "topic": val,
                                "relation": categoryMap
                            }
                        });
                    }
                    else {
                        response.status(200).send({
                            "status": "ERROR",
                            "msg": "Oops! Relation not found."
                        });
                    }
                });
            }
            else {
                response.status(200).send({
                    "status": "ERROR",
                    "msg": "Oops! blog not found."
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=page.js.map