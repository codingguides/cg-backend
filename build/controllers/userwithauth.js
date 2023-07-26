"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWithAuthController = void 0;
const express_1 = require("express");
const models_1 = require("../models");
exports.UserWithAuthController = express_1.Router();
/*
** API NAME: Update user without auth
** Methode: PUT
*/
exports.UserWithAuthController.put('/update-user/:id', async (request, response, next) => {
    try {
        const { body } = request;
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        let updateStatus = true;
        if (body.formStatus == "add") {
            const data = await models_1.UserModel.findOne({ repoName: body.repoName });
            if (data) {
                updateStatus = false;
            }
            else {
                updateStatus = true;
            }
        }
        if (updateStatus == true) {
            models_1.UserModel.updateOne(query, body)
                .then(result => {
                if (result.nModified = 1) {
                    response.status(200).send({
                        "success": true,
                        "data": result
                    });
                }
            })
                .catch(err => {
                response.status(200).send({
                    "success": false,
                    "data": err
                });
            });
        }
        else {
            response.status(200).send({
                "success": false,
                "message": "Domain Not Available"
            });
        }
    }
    catch (error) {
        next(error);
    }
});
/*
** API NAME: Get user by id without auth
** Methode: GET
*/
exports.UserWithAuthController.get('/user/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const data = await models_1.UserModel.findOne({ _id: ObjectId(_id) });
        if (data) {
            response.status(200).send({
                "success": true,
                "data": data
            });
        }
        else {
            response.status(404).send({
                "success": false,
                "message": "Oops! user not found."
            });
        }
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=userwithauth.js.map