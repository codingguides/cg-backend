"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authguard = void 0;
// import { CryproHelper, TokensHelper, AppException, StatusCodes  } from '@401_digital/xrm-core';
var jwt = require('jsonwebtoken');
let key = "KSpYChPbbKRrEIOj685rmY5d7eICGS5t";
const models_1 = require("../models");
var ObjectId = require('mongodb').ObjectId;
const Authguard = async (req, res, next) => {
    try {
        const authorization = req.headers['authorization'];
        if (!authorization) {
            // AppException.create(StatusCodes.UNAUTHORIZED_ACCESS, 'User is not authorised')
            throw new Error('User is not authorised');
        }
        else {
            const payload = await jwt.verify(authorization, key);
            console.log("payload>>>>>>>>>>>>>", payload);
            // Find user
            let user = await models_1.UserModel.findOne({ email: payload.email });
            if (!user) {
                throw new Error('No user found');
            }
            if (user['isdelete'] === true) {
                throw new Error('Your account has been De-Activated. Please contact Admin.');
            }
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.Authguard = Authguard;
//# sourceMappingURL=authgurd.js.map