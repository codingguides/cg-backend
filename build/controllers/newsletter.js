"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterController = void 0;
const express_1 = require("express");
const models_1 = require("../models");
exports.NewsletterController = (0, express_1.Router)();
exports.NewsletterController.delete('/delete/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        await models_1.NewsletterModel.deleteOne(query).then((val) => {
            if (val.deletedCount == 1) {
                response.status(200).send({
                    "status": "SUCCESS",
                    "msg": "Newsletter deleted successfully"
                });
            }
            else {
                response.status(404).send({
                    "status": "ERROR",
                    "msg": "Oops! something wrong, please try again"
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.NewsletterController.get('/list', async (request, response, next) => {
    try {
        await models_1.NewsletterModel.find().then((val) => {
            if (val) {
                response.status(200).send({
                    "status": "SUCCESS",
                    "msg": "Newsletter details successfully",
                    "payload": val
                });
            }
            else {
                response.status(404).send({
                    "status": "ERROR",
                    "msg": "Oops! newsletter not found."
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=newsletter.js.map