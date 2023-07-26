"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatainputController = void 0;
const express_1 = require("express");
const models_1 = require("../models");
exports.DatainputController = express_1.Router();
exports.DatainputController.post('/add', async (request, response, next) => {
    try {
        const { body } = request;
        models_1.DatainputModel.insertMany(body).then(function () {
            response.status(200).send({
                "success": true,
                "message": "Data inserted sucessfully done"
            });
        }).catch(function (error) {
            response.status(200).send({
                "success": false,
                "message": "Oops! something wrong."
            });
        });
    }
    catch (error) {
        next(error);
    }
});
exports.DatainputController.get('/list/:year/:userId', async (request, response, next) => {
    try {
        const { year, userId } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(userId);
        const data = await models_1.DatainputModel.find({ year: year, userId: _id });
        if (data) {
            response.status(200).send({
                "success": true,
                "data": data
            });
        }
        else {
            response.status(200).send({
                "success": false,
                "message": "Oops! no data found."
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.DatainputController.put('/update/:userId', async (request, response, next) => {
    try {
        const { body } = request;
        const { userId } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(userId);
        let count = 0;
        let myPromise = new Promise((resolve, reject) => {
            resolve(body.forEach(async (doc, i) => {
                console.log(i, "doc>>>>>>>>>>>>>>>>", doc);
                await models_1.DatainputModel.updateOne({ _id: doc.updateId }, {
                    $set: {
                        monthlyhourssoldtarget: doc.monthlyhourssoldtarget,
                        monthlylaboursalestarget: doc.monthlylaboursalestarget,
                        totalnumberofworkingdays: doc.totalnumberofworkingdays
                    }
                }).then((res) => {
                    console.log("res>>>>>>>>>>>>>>>", res);
                    count++;
                });
            }));
        });
        myPromise.then((value) => {
            response.status(200).send({
                "success": true
            });
        }, (error) => {
            response.status(200).send({
                "success": false
            });
        });
    }
    catch (error) {
        next(error);
    }
});
exports.DatainputController.put('/listbyId/:userId', async (request, response, next) => {
    try {
        const { body } = request;
        const { userId } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(userId);
        const data = await models_1.DatainputModel.find({
            year: body.year,
            month: body.month,
            userId: _id
        });
        if (data) {
            response.status(200).send({
                "success": true,
                "data": data
            });
        }
        else {
            response.status(200).send({
                "success": false,
                "message": "Oops! no data found."
            });
        }
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=datainput.js.map