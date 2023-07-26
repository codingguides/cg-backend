"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const xrm_core_1 = require("@401_digital/xrm-core");
const express_1 = require("express");
const models_1 = require("../models");
const { checkhashPassword } = require('../services/hash');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
let key = "KSpYChPbbKRrEIOj685rmY5d7eICGS5t";
let tokenType = "Bearer";
exports.LoginController = express_1.Router();
exports.LoginController.post('/login', async (request, response, next) => {
    try {
        const { body } = request;
        const data = await models_1.UserModel.findOne({ phone: body.phone });
        if (data) {
            bcrypt.compare(body.password, data['password'], function (err, result) {
                if (err)
                    throw err;
                console.log("result==================", result);
                if (result) {
                    const payload = {
                        id: data._id,
                        name: data['name'],
                        email: data['email'],
                        phone: data['phone']
                    };
                    const accessToken = jwt.sign(payload, key, {
                        expiresIn: '30d' // expires in a month
                        //expiresInMinutes: 2 //1440 // expires in 24 hours
                    });
                    // console.log("token===========",accessToken)
                    // let d = jwt.verify(accessToken, key);
                    // console.log("d===========",d.id)
                    // console.log("d===========",d.name)
                    // console.log("d===========",d.email)
                    // console.log("d===========",d.phone)
                    response.status(xrm_core_1.StatusCodes.OK).send({
                        result: 'ok',
                        data: {
                            data,
                            tokenType,
                            accessToken
                        }
                    });
                }
                else {
                    response.status(xrm_core_1.StatusCodes.OK).send({
                        result: 'ok',
                        message: 'Oops! Password not matched'
                    });
                }
            });
        }
        else {
            response.status(xrm_core_1.StatusCodes.OK).send({
                result: 'ok',
                message: 'Oops! Phone number not found'
            });
        }
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=login.js.map